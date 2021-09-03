import axios from "axios";

test.skip('should call get /orders/<code>', async () => {
  const response = await axios({
    url: "http://localhost:3000/orders/202000000001",
    method: "get"
  });
  const order = response.data;
  expect(order.code).toBe('202000000001');
});

test.skip('should call post /orders', async () => {
  const response = await axios({
    url: "http://localhost:3000/orders",
    method: "post",
    data: {
      cpf: '816.685.460-00',
      zipcode: '11.111-11',
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 1 },
        { id: '3', quantity: 3 }
      ],
      coupon: 'VALE20'
    }
  });
  const order = response.data;
  expect(order.total).toBe(5982);
});