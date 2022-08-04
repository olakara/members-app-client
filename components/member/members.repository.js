import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class MembersRepostory {
  programmersModel = null;
  ocrProgrammersModel = null;

  constructor() {
    this.programmersModel = new Observable([]);
    this.ocrProgrammersModel = new Observable({});
  }

  getMembers = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadData();
    this.programmersModel.notify();
  };

  getOcrData = async (eidPm, successCallback, errorCallback) => {
    this.ocrProgrammersModel.subscribe(successCallback);
    const eidDto = {
      frontPageId: eidPm.frontPageId,
      lastPageId: eidPm.lastPageId,
    };
    const ocrResultDto = await httpGateway.post(config.BASE_URL + 'ocr', eidDto);

    if (ocrResultDto.success) {
      this.ocrProgrammersModel.value = ocrResultDto.data;
      this.ocrProgrammersModel.notify();
    } else {
      errorCallback(ocrResultDto);
    }
  };

  createMember = async (memberPm, successCallback, errorCallback) => {
    const memberDto = {
      fullName: memberPm.fullName,
      emiratesIdNumber: memberPm.emiratesIdNumber,
      emiratesIdExpiry: memberPm.emiratesIdExpiry,
      emiratesIdFrontPage: memberPm.emiratesIdFrontPage,
      emiratesIdLastPage: memberPm.emiratesIdLastPage,
      dateOfBirth: memberPm.dateOfBirth,
      mobileNumber: memberPm.mobile,
      email: memberPm.email,
      passportNumber: this.nullIfEmpty(memberPm.passportNumber),
      passportExpiry: this.nullIfEmpty(memberPm.passportExpiry),
      passportFrontPage: this.nullIfEmpty(memberPm.passportFrontPage),
      passportLastPage: this.nullIfEmpty(memberPm.passportLastPage),
      professionId: this.nullIfEmpty(memberPm.profession),
      qualificationId: this.nullIfEmpty(memberPm.qualification),
      bloodGroup: this.nullIfEmpty(memberPm.bloodGroup),
      gender: memberPm.gender,
      photo: this.nullIfEmpty(memberPm.photo),
      houseName: memberPm.houseName,
      addressInIndia: memberPm.addressIndia,
      addressInDistrictId: memberPm.addressInDistrict,
      addressInMandalamId: memberPm.addressInMandalam,
      addressInPanchayatId: memberPm.addressInPanchayat,
      areaId: memberPm.area,
      panchayatId: memberPm.panchayat,
      mandalamId: memberPm.mandalam,
      registeredOrganizationId: this.nullIfEmpty(memberPm.registeredOrganization),
      welfareSchemeId: this.nullIfEmpty(memberPm.welfareScheme),
    };

    let result = await httpGateway.post(config.BASE_URL + 'members', memberDto);

    if (result.success) {
      successCallback();
    } else {
      errorCallback(result);
    }
  };

  nullIfEmpty = (property) => {
    return property && property.length !== 0 ? property : null;
  };

  loadData = async () => {
    const membersDto = await httpGateway.get(config.BASE_URL + 'members');
    this.programmersModel.value = membersDto.map((memberDto) => {
      return memberDto;
    });
  };
}

const membersRepostory = new MembersRepostory();
export default membersRepostory;
