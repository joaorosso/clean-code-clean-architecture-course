import pgp from "pg-promise";
import Database from "./Database";

export default class PgPromiseDatabase implements Database {
  private pgp: any;
  static instance: PgPromiseDatabase;

  private constructor() {
    this.pgp = pgp()('postgres://postgres:123456@localhost:5432/app-ccca');
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PgPromiseDatabase();
    }
    return this.instance;
  }

  many(query: string, parameters: any) {
    return this.pgp.query(query, parameters);
  }
  one(query: string, parameters: any) {
    return this.pgp.oneOrNone(query, parameters);
  }
}