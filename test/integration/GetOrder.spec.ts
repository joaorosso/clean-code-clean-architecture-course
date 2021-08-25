import GetOrder from "../../src/application/GetOrder";
import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInput from "../../src/application/PlaceOrderInput";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

let itemRepository: ItemRepository;
let couponRepository: CouponRepository;
let orderRepository: OrderRepositoryMemory;
let zipcodeCalculator: ZipcodeCalculatorAPIMemory;

beforeEach(() => {
  itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
  couponRepository = new CouponRepositoryMemory();
  orderRepository = new OrderRepositoryMemory();
  zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
});

test('should consult an order', async () => {
  const input = new PlaceOrderInput({
    cpf: '816.685.460-00',
    zipcode: '11.111-11',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 }
    ],
    coupon: 'VALE20'
  });
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipcodeCalculator);
  const output = await placeOrder.execute(input);
  const getOrder = new GetOrder(itemRepository, couponRepository, orderRepository);
  const getOrderOutput = await getOrder.execute(output.code);
  expect(getOrderOutput.total).toBe(5982);
});