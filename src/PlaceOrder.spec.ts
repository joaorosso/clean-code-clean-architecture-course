import CouponRepository from "./CouponRepository";
import CouponRepositoryMemory from "./CouponRepositoryMemory";
import ItemRepository from "./ItemRepository";
import ItemRepositoryMemory from "./ItemRepositoryMemory";
import OrderRepositoryMemory from "./OrderRepositoryMemory";
import PlaceOrder from "./PlaceOrder";
import PlaceOrderInput from "./PlaceOrderInput";
import ZipcodeCalculatorAPIMemory from "./ZipcodeCalculatorAPIMemory";

let itemRepository: ItemRepository;
let couponRepository: CouponRepository;
let orderRepository: OrderRepositoryMemory;
let zipcodeCalculator: ZipcodeCalculatorAPIMemory;

beforeEach(() => {
  itemRepository = new ItemRepositoryMemory();
  couponRepository = new CouponRepositoryMemory();
  orderRepository = new OrderRepositoryMemory();
  zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
});

test('should place order', () => {
  const input = new PlaceOrderInput({
    cpf: '816.685.460-00',
    zipcode: '11.111-11',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 }
    ],
    coupon: 'DISC20'
  });
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator);
  const output = placeOrder.execute(input);
  expect(output.total).toBe(5982);
});

test('should place order with espired discount coupon', () => {
  const input = new PlaceOrderInput({
    cpf: '816.685.460-00',
    zipcode: '11.111-11',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 }
    ],
    coupon: 'DISC20_EXPIRED'
  });
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator);
  const output = placeOrder.execute(input);
  expect(output.total).toBe(7400);
});

test('should place order with freight', () => {
  const input = new PlaceOrderInput({
    cpf: '816.685.460-00',
    zipcode: '11.111-11',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 }
    ],
    coupon: 'DISC20_EXPIRED'
  });
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator);
  const output = placeOrder.execute(input);
  expect(output.freight).toBe(310);
});

