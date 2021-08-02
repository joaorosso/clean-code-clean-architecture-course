"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf) {
        this.cpf = new Cpf_1.default(cpf);
        this.items = [];
    }
    addItem(description, price, quantity) {
        this.items.push(new OrderItem_1.default(description, price, quantity));
    }
    addCoupon(coupon) {
        this.coupon = coupon;
    }
    getTotal() {
        let total = 0;
        for (const item of this.items) {
            total += item.getTotal();
        }
        if (this.coupon) {
            total -= total * this.coupon.percentage / 100;
        }
        return total;
    }
}
exports.default = Order;
