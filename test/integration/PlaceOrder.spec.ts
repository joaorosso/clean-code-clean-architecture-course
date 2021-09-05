import PlaceOrder from "../../src/application/place-order/PlaceOrder";
import PlaceOrderInput from "../../src/application/place-order/PlaceOrderInput";
import StockEntryRepository from "../../src/domain/repository/StockEntryRepository";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let repositoryFactory: DatabaseRepositoryFactory;
let orderRepository: OrderRepositoryDatabase;
let stockEntryRepository: StockEntryRepository;
let zipcodeCalculator: ZipcodeCalculatorAPIMemory;

beforeEach(async () => {
  repositoryFactory = new DatabaseRepositoryFactory();
  orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
  stockEntryRepository = repositoryFactory.createStockEntryRepository();
  zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
  await orderRepository.clean();
  await stockEntryRepository.clean();
});

test('should place order', async () => {
  const input = getDefaultPlaceOrderInput('VALE20');
  const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(5982);
});

test('should place order with espired discount coupon', async () => {
  const input = getDefaultPlaceOrderInput('VALE20_EXPIRED');
  const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(7400);
});

test('should place order with freight', async () => {
  const input = getDefaultPlaceOrderInput('VALE20_EXPIRED');
  const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.freight).toBe(310);
});

test('should place order calculating the code', async () => {
  const input = getDefaultPlaceOrderInput('VALE20_EXPIRED', '2020-10-10');
  const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.code).toBe('202000000001');
});

test('should place order calculating taxes', async () => {
  const input = getDefaultPlaceOrderInput('VALE20');
  const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(5982);
  expect(output.taxes).toBe(1054.5);
});

test('should not order an out-of-stock item', async () => {
  const placeOrderInput = new PlaceOrderInput({
    cpf: '816.685.460-00',
    zipcode: '11.111-11',
    items: [
      { idItem: 1, quantity: 12 }
    ],
    coupon: 'VALE20'
  });
  const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
  await expect(placeOrder.execute(placeOrderInput)).rejects.toThrow(new Error("Out of stock"));
});

function getDefaultPlaceOrderInput(coupon: string, issueDate?: string): PlaceOrderInput {
  const placeOrderInput = new PlaceOrderInput({
    cpf: '816.685.460-00',
    zipcode: '11.111-11',
    items: [
      { idItem: 1, quantity: 2 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ],
    coupon: coupon
  });
  if (issueDate) placeOrderInput.issueDate = new Date(issueDate);
  return placeOrderInput;
}
