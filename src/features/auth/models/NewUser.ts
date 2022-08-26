import { SignUpFormInterface } from './SignUpFormField.interface';

export type NewUser = Omit<SignUpFormInterface, 'confirmPassword'>;
