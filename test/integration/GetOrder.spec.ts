import GetOrder from "../../src/application/get-order/GetOrder";
import PlaceOrder from "../../src/application/place-order/PlaceOrder";
import PlaceOrderInput from "../../src/application/place-order/PlaceOrderInput";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";

let repositoryFactory: DatabaseRepositoryFactory;
let orderRepository: OrderRepository;
let zipcodeCalculator: ZipcodeCalculatorAPIMemory;

beforeEach(async () => {
  repositoryFactory = new DatabaseRepositoryFactory();
  orderRepository = repositoryFactory.createOrderRepository();
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
  const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
  const output = await placeOrder.execute(input);
  const getOrder = new GetOrder(repositoryFactory);
  const getOrderOutput = await getOrder.execute(output.code);
  expect(getOrderOutput.total).toBe(5982);
});