const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;
const MAX_DIGITS_1 = 9;
const MAX_DIGITS_2 = 10;

export function validate(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (areRepeatedNumber(cpf)) return false;
  const digit1 = calculateDigit(cpf, FACTOR_DIGIT_1, MAX_DIGITS_1);
  const digit2 = calculateDigit(cpf, FACTOR_DIGIT_2, MAX_DIGITS_2);
  let calculatedCheckDigit = `${digit1}${digit2}`;
  return getCheckDigit(cpf) == calculatedCheckDigit;
}

export function areRepeatedNumber(cpf: string): boolean {
  const [digit1] = cpf;
  return cpf.split('').every(d => d === digit1);
}

export function calculateDigit(cpf: string, factor: number, max: number): number {
  let total = 0;
  for (const digit of toDigitArray(cpf).slice(0, max)) {
    total += digit * factor--;
  }
  return (total % 11 < 2) ? 0 : (11 - total % 11);
}

export function toDigitArray(cpf: string): number[] {
  return [...cpf].map(digit => parseInt(digit));
}

export function getCheckDigit(cpf: string): string {
  return cpf.slice(9);
}
