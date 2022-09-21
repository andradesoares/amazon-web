import { validateNameLength, validatePasswordLength } from './length';

describe('Field length validation', () => {
  describe('Password length validation', () => {
    let password = '';
    test('a password should fail length validation if not set', () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });
    password = '12345';
    test('a password should fail length validation if is less than 6 characters', () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });
    password = '123456';
    test('a password should pass length validation if is iqual or more than 6 characters', () => {
      expect(validatePasswordLength(password)).toEqual(true);
    });
  });

  describe('Name length validation', () => {
    let name = '';
    test('a name should fail length validation if not set', () => {
      expect(validateNameLength(name)).toEqual(false);
    });
    name = 'J';
    test('a name should fail length validation if is less than 2 characters', () => {
      expect(validateNameLength(name)).toEqual(false);
    });
    name = 'Jo';
    test('a name should pass length validation if is iqual or more than 2 characters', () => {
      expect(validateNameLength(name)).toEqual(true);
    });
  });
});
