import { validateEmail } from './email';

describe('Email validation', () => {
  let email = '';

  test('an empty input should not be valid', () => {
    expect(validateEmail(email)).toEqual(false);
  });
  email = 'jon@gmail.com';
  test('it should have an @ symbol', () => {
    expect(email.includes('@')).toEqual(true);
  });
  test('a valid email should pass validation', () => {
    email = 'jon@gmail.com';
    expect(validateEmail(email)).toEqual(true);
  });
});
