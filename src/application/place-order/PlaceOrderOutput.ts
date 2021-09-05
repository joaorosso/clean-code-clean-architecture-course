export default class PlaceOrderOutput {
  total: number;
  freight: number;
  taxes: any;
  code: any;

  constructor({ code, freight, taxes, total }: { code: string, freight: number, taxes: number, total: number }) {
    this.code = code;
    this.freight = freight;
    this.taxes = taxes;
    this.total = total;
  }
}