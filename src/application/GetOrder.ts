import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import GetOrderOutput from "./GetOrderOutput";

export default class PlaceOrder {
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;

  constructor(itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository) {
    this.itemRepository = itemRepository;
    this.couponRepository = couponRepository;
    this.orderRepository = orderRepository;
  }

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.get(code);
    const orderItems: any[] = [];
    for (const orderItem of order.items) {
      const item = await this.itemRepository.getById(orderItem.id);
      const orderItemOutput = {
        itemDescription: item?.description,
        price: orderItem.price,
        quantity: orderItem.quantity
      };
      orderItems.push(orderItemOutput);
    }
    return new GetOrderOutput({
      code: order.code.value,
      freight: order.freight,
      total: order.getTotal(),
      orderItems
    });
  }
}