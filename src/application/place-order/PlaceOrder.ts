import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI";
import OrderCreator from "../../domain/service/OrderCreator";
import ZipcodeCalculatorAPIMemory from "../../infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
  zipcodeCalculator: ZipcodeCalculatorAPIMemory;
  repositoryFactory: RepositoryFactory;

  constructor(repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
    this.repositoryFactory = repositoryFactory;
    this.zipcodeCalculator = zipcodeCalculator;
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const orderService = new OrderCreator(this.repositoryFactory, this.zipcodeCalculator);
    const order = await orderService.create(input);
    const total = order.getTotal();
    return new PlaceOrderOutput({
      freight: order.freight,
      taxes: order.taxes,
      code: order.code.value,
      total
    });
  }
}