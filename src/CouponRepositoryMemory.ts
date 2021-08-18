import Coupon from "./Coupon";
import CouponRepository from "./CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon('DISC20', 20, new Date('2021-10-10')),
      new Coupon('DISC20_EXPIRED', 20, new Date('2020-10-10'))
    ];
  }

  getByCode(code: string): Coupon | undefined {
    return this.coupons.find((coupon) => coupon.code === code);
  }
}