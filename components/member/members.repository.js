import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class MembersRepostory {
  programmersModel = null;

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getMembers = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadData();
    this.programmersModel.notify();
  };

  createMember = async (memberPm, successCallback, errorCallback) => {
    const memberDto = {
      fullName: memberPm.fullName,
      emiratesIdNumber: memberPm.emiratesIdNumber,
      emiratesIdExpiry: memberPm.emiratesIdExpiry,
      dateOfBirth: memberPm.dateOfBirth,
      mobileNumber: memberPm.mobile,
      alternativeContactNumber: memberPm.alternateMobile,
      email: memberPm.email,
      passportNumber: memberPm.passportNumber,
      passportExpiry: memberPm.passportExpiry,
      professionId: memberPm.profession,
      qualificationId: memberPm.qualification,
      bloodGroup: memberPm.bloodGroup,
      houseName: memberPm.houseName,
      addressIndia: memberPm.addressIndia,
      areaId: memberPm.area,
      panchayatId: memberPm.panchayat,
      registeredOrganizationId: memberPm.registeredOrganization,
      welfareSchemeId: memberPm.welfareScheme,
      emiratesIdFrontPage: null,
      emiratesIdLastPage: null,
      passportFrontPage: null,
      passportLastPage: null,
      photo: null,
    };

    let result = await httpGateway.post(config.BASE_URL + 'members', memberDto);

    if (result.success) {
      successCallback();
    } else {
      errorCallback(result);
    }
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
