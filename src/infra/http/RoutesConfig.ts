import GetOrder from "../../application/get-order/GetOrder";
import PlaceOrder from "../../application/place-order/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import ZipcodeCalculatorAPIMemory from "../gateway/memory/ZipcodeCalculatorAPIMemory";
import Http from "./Http";

export default class RoutesConfig {
  http: Http;
  repositoryFactory: RepositoryFactory;

  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    this.http = http;
    this.repositoryFactory = repositoryFactory;
  }

  build() {
    this.http.on('get', '/orders/${code}', async (params: any, body: any) => {
      const getOrder = new GetOrder(this.repositoryFactory);
      return await getOrder.execute(params.code);
    });

    this.http.on('post', '/orders', async (params: any, body: any) => {
      const getOrder = new PlaceOrder(this.repositoryFactory, new ZipcodeCalculatorAPIMemory);
      return await getOrder.execute(body);
    });
  }
}