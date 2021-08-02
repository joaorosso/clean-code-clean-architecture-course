"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = __importDefault(require("./PlaceOrder"));
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
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7150);
});
