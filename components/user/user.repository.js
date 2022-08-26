import jwt_decode from 'jwt-decode';
import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class UserRepository {
  userProgrammersModel = null;

  constructor() {
    this.userProgrammersModel = new Observable({});
  }

  getCurrentUser = async (callback) => {
    this.userProgrammersModel.subscribe(callback);
    const userDto = await httpGateway.get(config.BASE_URL + config.USER_INFO);
    this.userProgrammersModel.value = userDto;
    this.userProgrammersModel.notify();
  };

  signIn = async (signInDto) => {
    const accessDto = await httpGateway.post(config.BASE_URL + config.SIGN_IN, signInDto);
    if (accessDto.data.accessToken) {
      localStorage.setItem('token', accessDto.data.accessToken);
      return true;
    } else {
      return false;
    }
  };

  signOut = async () => {
    localStorage.clear();
  };

  isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwt_decode(token);
    const dateNow = new Date();

    return decoded.exp < dateNow.getTime() ? true : false;
  };
}

const userRepository = new UserRepository();
export default userRepository;
