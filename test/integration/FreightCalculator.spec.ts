import FreightCalculator from "../../src/domain/service/FreightCalculator";
import Item from "../../src/domain/entity/Item";

test('should calculate the amp freight', () => {
  const item = new Item(1, 'Amp', 5000, 50, 50, 50, 22);
  const distance = 1000;
  const price = FreightCalculator.calculate(distance, item);
  expect(price).toBe(220);
});

test('should calculate the guitar freight', () => {
  const item = new Item(2, 'Guitar', 1000, 100, 50, 15, 3);
  const distance = 1000;
  const price = FreightCalculator.calculate(distance, item);
  expect(price).toBe(30);
});

test('should calculate the cable freight with min freight', () => {
  const item = new Item(3, 'cabo', 30, 9, 9, 9, 0.1);
  const distance = 1000;
  const price = FreightCalculator.calculate(distance, item);
  expect(price).toBe(10);
});