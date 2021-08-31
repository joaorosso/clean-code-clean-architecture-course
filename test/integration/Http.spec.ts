import axios from "axios";

test('should call /orders/<code>', async () => {
  const response = await axios({
    url: "http://localhost:3000/orders/202000000001",
    method: "get"
  });
  const order = response.data;
  expect(order.code).toBe('202000000001');
});