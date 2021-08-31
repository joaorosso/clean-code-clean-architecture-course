import axios from "axios";

test('should call /orders/<code>', async () => {
  const response = await axios({
    url: 'http://localhost:3000/orders/20210000001',
    method: 'GET'
  });
  const order = response.data;
  console.log(response);
  expect(order.code).toBe('20210000001');
});