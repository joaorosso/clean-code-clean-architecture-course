import GetOrder from "../../src/application/GetOrder";
import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInput from "../../src/application/PlaceOrderInput";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let itemRepository: ItemRepositoryDatabase;
let couponRepository: CouponRepositoryDatabase;
let orderRepository: OrderRepositoryDatabase;
let zipcodeCalculator: ZipcodeCalculatorAPIMemory;

beforeEach(async () => {
  itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
  couponRepository = new CouponRepositoryDatabase(PgPromiseDatabase.getInstance());
  orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
  zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
  await orderRepository.clean();
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