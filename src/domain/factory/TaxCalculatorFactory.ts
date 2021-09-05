import DefaultTaxCalculator from "../service/DefaultTaxCalculator";
import NovemberTaxCalculator from "../service/NovemberTaxCalculator";

export default class TaxCalculatorFactory {
  static NOVEMBER: number = 10;

  static create(date: Date) {
    if (date.getMonth() === this.NOVEMBER) {
      return new NovemberTaxCalculator();
    } else {
      return new DefaultTaxCalculator();
    }
  }
}