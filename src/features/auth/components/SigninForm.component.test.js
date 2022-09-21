import { reducer, screen } from '../../../shared/utils/test-utils';
import SignInForm from './SignInForm.component';

describe('SignIn Form', () => {
  let signinButton = null;
  beforeEach(() => {
    reducer(<SignInForm />);
    signinButton = screen.getByRole('button', { name: /Sign in/i });
  });
  test('The login button should be in the document', () => {
    expect(signinButton).toBeInTheDocument();
  });

  test('The login button should initialy be disable', () => {
    expect(signinButton).toBeDisabled();
  });
});
