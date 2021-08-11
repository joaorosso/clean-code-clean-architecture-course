import Item from "./Item";

test('should calculate the item volume', () => {
  const item = new Item('1', 'Amp', 5000, 50, 50, 50, 22);
  const volume = item.getVolume();
  expect(volume).toBe(0.125);
});

test('should calculate the item density', () => {
  const item = new Item('1', 'Amp', 5000, 50, 50, 50, 22);
  const density = item.getDensity();
  expect(density).toBe(176);
});