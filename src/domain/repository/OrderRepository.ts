import Order from "../../domain/entity/Order";

export default interface OrderRepository {
  save(order: Order): void;
  get(code: string): Order;
  count(): number;
}