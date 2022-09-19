import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { DecodedJwt } from '../models/DecodedJwt.interface';
import { DisplayUser } from '../models/DisplayUser.interface';
import { Jwt } from '../models/Jwt';
import { NewUser } from '../models/NewUser';
import { SigninUser } from '../models/SiginUser.interface';

const signup = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/signup`, newUser);

  return response.data;
};

const signin = async (user: SigninUser): Promise<Jwt> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/signin`, user);

  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify(response.data));
    const decodedJwt: DecodedJwt = jwtDecode(response.data.token);
    localStorage.setItem('user', JSON.stringify(decodedJwt));
  }

  return response.data;
};

const authService = {
  signup,
  signin,
  // logout,
  // verifyJwt
};

export default authService;
