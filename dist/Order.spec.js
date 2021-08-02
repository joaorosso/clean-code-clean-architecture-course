"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("./Coupon"));
const Order_1 = __importDefault(require("./Order"));
test('should not create an order with invalid CPF', () => {
    const cpf = '111.111.111-11';
    expect(() => new Order_1.default(cpf)).toThrow(new Error('Invalid CPF'));
});
test('should create an order with 3 items', () => {
    const cpf = '816.685.460-00';
    const order = new Order_1.default(cpf);
    order.addItem("Guitar", 3000, 1);
    order.addItem("Amp", 2000, 1);
    order.addItem("Pedal Distortion", 400, 1);
    order.addItem("Cable", 80, 2);
    const total = order.getTotal();
    expect(total).toBe(5560);
});
test('should create an order with a discount coupon', () => {
    const cpf = '816.685.460-00';
    const order = new Order_1.default(cpf);
    order.addItem("Guitar", 3000, 1);
    order.addItem("Amp", 2000, 1);
    order.addItem("Pedal Distortion", 400, 1);
    order.addItem("Cable", 80, 2);
    order.addCoupon(new Coupon_1.default('DISC20', 20));
    const total = order.getTotal();
    expect(total).toBe(4448);
});
