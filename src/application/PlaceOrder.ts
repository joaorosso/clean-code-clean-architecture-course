import Order from "../domain/entity/Order";
import ZipcodeCalculatorAPI from "../domain/gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import FreightCalculator from "../domain/service/FreightCalculator";
import ZipcodeCalculatorAPIMemory from "../infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
  zipcodeCalculator: ZipcodeCalculatorAPIMemory;
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;

  constructor(itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository, zipcodeCalculator: ZipcodeCalculatorAPI) {
    this.itemRepository = itemRepository;
    this.couponRepository = couponRepository;
    this.orderRepository = orderRepository;
    this.zipcodeCalculator = zipcodeCalculator;
  }

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order(input.cpf);
    const distance = this.zipcodeCalculator.calculate(input.zipcode, '99.999-999');
    for (const orderItem of input.items) {
      const item = this.itemRepository.getById(orderItem.id);
      if (!item) throw new Error('Item not found');
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
    }
    if (input.coupon) {
      const coupon = this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orderRepository.save(order);
    return new PlaceOrderOutput({
      freight: order.freight,
      total
    });
  }
}