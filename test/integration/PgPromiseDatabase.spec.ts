import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";

test('should connect in database and get all items', async () => {
  const pgPromiseDatabase = PgPromiseDatabase.getInstance();
  const items = await pgPromiseDatabase.many('select * from ccca.item', []);
  expect(items).toHaveLength(3);
});

test('should connect in database and get an item by id', async () => {
  const pgPromiseDatabase = PgPromiseDatabase.getInstance();
  const item = await pgPromiseDatabase.one('select * from ccca.item where id = $1', [1]);
  expect(item.description).toBe('Guitarra');
});