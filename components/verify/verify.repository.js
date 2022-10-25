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

  submitVerification = async (verificationForm, successCallback, errorCallback) => {
    const verificationDto = {
      id: verificationForm.id,
      ediFrontAndBackSideValid: verificationForm.ediFrontAndBackSideValid === 'Yes' ? true : false,
      eidNumberValid: verificationForm.eidNumberValid === 'Yes' ? true : false,
      eidFullNameValid: verificationForm.eidFullNameValid === 'Yes' ? true : false,
      eidNationalityValid: verificationForm.eidNationalityValid === 'Yes' ? true : false,
      eidDOBValid: verificationForm.eidDOBValid === 'Yes' ? true : false,
      eidDOEValid: verificationForm.eidDOEValid === 'Yes' ? true : false,
      passportFirstPageValid: verificationForm.passportFirstPageValid
        ? verificationForm.passportFirstPageValid === 'Yes'
          ? true
          : false
        : null,
      passportLastPageValid: verificationForm.passportLastPageValid
        ? verificationForm.passportLastPageValid === 'Yes'
          ? true
          : false
        : null,
      cardType: 0,
      gender: verificationForm.gender,
      eidIssuePlaceValid: verificationForm.eidIssuePlaceValid === 'Yes' ? true : false,
      verifiedUserId: null,
    };

    let result = await httpGateway.put(
      config.BASE_URL + 'MembershipVerification/' + verificationForm.id,
      verificationDto
    );

    if (result.success) {
      successCallback(result);
    } else {
      errorCallback(result);
    }
  };
}

const verifyRepository = new VerifyRepository();
export default verifyRepository;
