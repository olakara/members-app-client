import { config } from '../../shared/constants';
import Observable from '../../shared/observable';
import httpGateway from '../../shared/http-gateway';

class VerifyRepository {
  verifyIdTokenModle = null;
  memberProgrammersModel = null;

  constructor() {
    this.verifyIdTokenModle = new Observable({});
    this.memberProgrammersModel = new Observable({});
  }

  initVerification = async (callback) => {
    this.verifyIdTokenModle.subscribe(callback);
    let result = await httpGateway.post(config.BASE_URL + 'MembershipVerification/', {
      id: null,
      verifiedUserId: null,
    });
    this.verifyIdTokenModle.value = result;
    this.verifyIdTokenModle.notify();
  };

  getMembershipVerfication = async (id, callback) => {
    this.memberProgrammersModel.subscribe(callback);
    let result = await httpGateway.get(config.BASE_URL + 'MembershipVerification/' + id);
    this.memberProgrammersModel.value = result;
    this.memberProgrammersModel.notify();
  };
}

const verifyRepository = new VerifyRepository();
export default verifyRepository;
