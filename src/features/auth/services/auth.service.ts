import axios from 'axios';
import { DisplayUser } from '../models/DisplayUser.interface';
import { NewUser } from '../models/NewUser';

const signup = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/signup`, newUser);

  return response.data;
};

const authService = {
  signup,
  // signin,
  // logout,
  // verifyJwt
};

export default authService;
