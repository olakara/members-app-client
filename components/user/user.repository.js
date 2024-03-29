import jwt_decode from 'jwt-decode';
import cryptojs from 'crypto-js';
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
    const key = cryptojs.enc.Utf8.parse('8056483646328763');
    const iv = cryptojs.enc.Utf8.parse('8056483646328763');
    const encrypted = cryptojs.AES.encrypt(cryptojs.enc.Utf8.parse(signInDto.password), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.Pkcs7,
    }).toString();

    signInDto.password = encrypted;
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

  canUserAddMember = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwt_decode(token);
    return JSON.parse(decoded.IsAddMember);
  };

  canUserAddUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwt_decode(token);
    return JSON.parse(decoded.IsAddUser);
  };
}

const userRepository = new UserRepository();
export default userRepository;
