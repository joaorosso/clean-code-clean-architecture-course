"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
const Order_1 = __importDefault(require("./Order"));
class PlaceOrder {
    constructor() {
        this.coupons = [
            new Coupon_1.default('VALE', 20)
        ];
        this.orders = [];
    }
    execute(input) {
        const order = new Order_1.default(input.cpf);
        for (const item of input.items) {
            order.addItem(item.description, item.price, item.quantity);
        }
        if (input.coupon) {
            const coupon = this.coupons.find((coupon) => coupon.code === input.coupon);
            if (coupon)
                order.addCoupon(coupon);
        }
        const total = order.getTotal();
        this.orders.push(order);
        return {
            total
        };
    }
}
exports.default = PlaceOrder;
