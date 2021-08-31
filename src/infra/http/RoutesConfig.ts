import GetOrder from "../../application/GetOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
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
  }
}