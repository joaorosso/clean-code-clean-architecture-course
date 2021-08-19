export default class PlaceOrderOutput {
  total: number;
  freight: number;

  constructor({ freight, total }: { freight: number, total: number }) {
    this.freight = freight;
    this.total = total;
  }
}