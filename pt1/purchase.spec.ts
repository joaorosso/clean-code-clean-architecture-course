import { validate } from './purchase';

describe('testing purchase file', () => {
  describe('testing validate method', () => {
    it('should invalidate cpf with less than 11 lengths', () => {
      const isValid = validate('3518487809');
      expect(isValid).toBe(false);
    });

    it('should invalidate cpf with more than 11 lengths', () => {
      const isValid = validate('351848780921');
      expect(isValid).toBe(false);
    });

    it('should invalidate cpf with repeateded number', () => {
      const isValid = validate('00000000000');
      expect(isValid).toBe(false);
    });

    it('should invalidate cpf with random numbers', () => {
      const isValid = validate('12345678912');
      expect(isValid).toBe(false);
    });

    it('should validate cpf with 11 lengths and without pontuations', () => {
      const isValid = validate('35184878092');
      expect(isValid).toBe(true);
    });

    it('should validate cpf with 11 lengths and with pontuations', () => {
      const isValid = validate('582.670.280-05');
      expect(isValid).toBe(true);
    });
  });
});