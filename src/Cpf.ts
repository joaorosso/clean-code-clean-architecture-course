export default class Cpf {
  value: string;
  FACTOR_DIGIT_1 = 10;
  FACTOR_DIGIT_2 = 11;
  MAX_DIGITS_1 = 9;
  MAX_DIGITS_2 = 10;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid CPF');
    this.value = value;
  }

  validate(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (this.areRepeatedNumber(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, this.FACTOR_DIGIT_1, this.MAX_DIGITS_1);
    const digit2 = this.calculateDigit(cpf, this.FACTOR_DIGIT_2, this.MAX_DIGITS_2);
    let calculatedCheckDigit = `${digit1}${digit2}`;
    return this.getCheckDigit(cpf) == calculatedCheckDigit;
  }

  areRepeatedNumber(cpf: string): boolean {
    const [digit1] = cpf;
    return cpf.split('').every(d => d === digit1);
  }

  calculateDigit(cpf: string, factor: number, max: number): number {
    let total = 0;
    for (const digit of this.toDigitArray(cpf).slice(0, max)) {
      total += digit * factor--;
    }
    return (total % 11 < 2) ? 0 : (11 - total % 11);
  }

  toDigitArray(cpf: string): number[] {
    return [...cpf].map(digit => parseInt(digit));
  }

  getCheckDigit(cpf: string): string {
    return cpf.slice(9);
  }
}
