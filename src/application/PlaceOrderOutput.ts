export default class PlaceOrderOutput {
  total: number;
  freight: number;
  code: any;

  constructor({ code, freight, total }: { code: string, freight: number, total: number }) {
    this.code = code;
    this.freight = freight;
    this.total = total;
  }
}