import TaxTable from "../../../domain/entity/TaxTable";
import TaxTableRepository from "../../../domain/repository/TaxTableRepository";
import Database from "../../database/Database";

export default class TaxTableRepositoryDatabase implements TaxTableRepository {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getByIdItem(idItem: number): Promise<TaxTable[]> {
    const query = "select * from ccca.tax_table where id_item = $1";
    const taxTablesData = await this.database.many(query, [idItem]);
    const taxTables = [];
    for (const taxTableData of taxTablesData) {
      taxTables.push(new TaxTable(taxTableData.id_item, taxTableData.type, parseFloat(taxTableData.value)));
    }
    return taxTables;
  }
}