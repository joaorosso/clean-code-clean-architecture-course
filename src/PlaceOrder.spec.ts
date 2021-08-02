import PlaceOrder from "./PlaceOrder";

test('should place order', () => {
  const input = {
    cpf: '816.685.460-00',
    items: [
      { description: 'Guitar', price: 3000, quantity: 1 },
      { description: 'Amp', price: 2000, quantity: 2 },
      { description: 'Cable', price: 50, quantity: 3 }
    ],
    coupon: 'DISC20'
  };
  const placeOrder = new PlaceOrder();
  const output = placeOrder.execute(input);
  expect(output.total).toBe(7150);
});