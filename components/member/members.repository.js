import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class MembersRepostory {
  programmersModel = null;
  ocrProgrammersModel = null;
  membershipModel = null;
  disputeInfoProgrammersModel = null;

  constructor() {
    this.programmersModel = new Observable({});
    this.ocrProgrammersModel = new Observable({});
    this.membershipModel = new Observable({});
    this.disputeInfoProgrammersModel = new Observable({});
  }

  getMembers = async (callback, searchDto) => {
    this.programmersModel.subscribe(callback);
    await this.loadData(searchDto);
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

  getMembershipDetails = async (id, callback) => {
    this.membershipModel.subscribe(callback);
    await this.loadMembershipData(id);
    this.membershipModel.notify();
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
      bloodGroup: +memberPm.bloodGroup,
      gender: +memberPm.gender,
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
      cardNumber: this.nullIfEmpty(memberPm.cardNumber),
      manuallyEntered: memberPm.manuallyEntered,
    };

    let result = await httpGateway.post(config.BASE_URL + 'members', memberDto);

    if (result.success) {
      successCallback(result);
    } else {
      errorCallback(result);
    }
  };

  createDispute = async (disputePm, successCallback, errorCallback) => {
    const disputeDto = {
      memberId: disputePm.id,
      toAreaId: disputePm.toArea,
      toPanchayatId: disputePm.toPanchayath,
      reason: disputePm.remarks,
    };

    let result = await httpGateway.post(config.BASE_URL + 'disputes', disputeDto);
    if (result.success) {
      successCallback(result);
    } else {
      errorCallback(result);
    }
  };

  downloadReceipt = async (id, memberId) => {
    let file = await httpGateway.download(config.BASE_URL + 'members/membershipcardpdf/' + id);
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', memberId + `.pdf`);

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  nullIfEmpty = (property) => {
    return property && property.length !== 0 ? property : null;
  };

  loadMembershipData = async (id) => {
    const dto = await httpGateway.get(config.BASE_URL + 'members/membershipcard/' + id);
    if (!dto) return;
    this.membershipModel.value = dto;
  };

  getDisputeInfoForMember = async (eid, callback) => {
    this.disputeInfoProgrammersModel.subscribe(callback);
    await this.loadDisputedInfo(eid);
    this.disputeInfoProgrammersModel.notify();
  };

  loadData = async (searchDto) => {
    const membersDto = await httpGateway.post(config.BASE_URL + 'members/role', searchDto);
    this.programmersModel.value = membersDto;
  };

  loadDisputedInfo = async (eid) => {
    const dto = await httpGateway.get(config.BASE_URL + 'members/isdispute?emiratesIdNumber=' + eid);
    this.disputeInfoProgrammersModel.value = dto;
  };

  getMemberViewerDetails = async (id, callback) => {
    const dto = await httpGateway.get(config.BASE_URL + 'memberview/' + id);
    if (!dto) return;
    callback(dto);
  };

  downloadMembersExcel = async (searchDto, callback) => {
    let file = await httpGateway.downloadWithPost(config.BASE_URL + 'members/role-excel', searchDto);
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MembersList.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    callback('done');
  };
}

const membersRepostory = new MembersRepostory();
export default membersRepostory;
