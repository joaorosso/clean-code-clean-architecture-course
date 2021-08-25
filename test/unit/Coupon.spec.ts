import Coupon from '../../src/domain/entity/Coupon';

test('should verify if coupon is expired', () => {
  const coupon = new Coupon('VALE20', 20, new Date('2020-10-10'));
  expect(coupon.isExpired()).toBe(true);
});