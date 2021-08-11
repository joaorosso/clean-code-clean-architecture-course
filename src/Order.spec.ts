import Coupon from './Coupon';
import Order from './Order';

test('should not create an order with invalid CPF', () => {
  const cpf = '111.111.111-11';
  expect(() => new Order(cpf)).toThrow(new Error('Invalid CPF'));
});

test('should create an order with 3 items', () => {
  const cpf = '816.685.460-00';
  const order = new Order(cpf);
  order.addItem('1', 1000, 2);
  order.addItem('2', 5000, 1);
  order.addItem('3', 30, 3);
  const total = order.getTotal();
  expect(total).toBe(7090);
});

test('should create an order with a discount coupon', () => {
  const cpf = '816.685.460-00';
  const order = new Order(cpf);
  order.addItem('1', 1000, 2);
  order.addItem('2', 5000, 1);
  order.addItem('3', 30, 3);
  order.addCoupon(new Coupon('DISC20', 20, new Date('2021-10-10')))
  const total = order.getTotal();
  expect(total).toBe(5672);
});

test('should create an order with an expired discount coupon', () => {
  const cpf = '816.685.460-00';
  const order = new Order(cpf);
  order.addItem('1', 1000, 2);
  order.addItem('2', 5000, 1);
  order.addItem('3', 30, 3);
  order.addCoupon(new Coupon('DISC20', 20, new Date('2020-10-10')))
  const total = order.getTotal();
  expect(total).toBe(7090);
});
