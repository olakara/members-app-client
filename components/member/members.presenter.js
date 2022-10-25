import membersRepostory from './members.repository';
import { isEmptyObject } from '../../shared/utilities';

export default class MembersPresenter {
  load = async (callback, config) => {
    await membersRepostory.getMembers((membersPm) => {
      if (!membersPm.data) return;
      let { data } = membersPm;
      const members = data.items.map((memberPm) => {
        return {
          id: memberPm.id,
          membershipId: memberPm.membershipId,
          fullName: memberPm.fullName,
          panchayat: memberPm.panchayat.name,
          mobile: memberPm.mobileNumber,
          agent: memberPm.agent,
        };
      });

      callback({ ...data, items: members });
    }, config);
  };

  createMember = async (memberPm, successCallback, errorCallback) => {
    await membersRepostory.createMember(memberPm, successCallback, errorCallback);
  };

  createDispute = async (disputePm, successCallback, errorCallback) => {
    await membersRepostory.createDispute(disputePm, successCallback, errorCallback);
  };

  getOcrData = async (eidPm, successCallback, errorCallback) => {
    await membersRepostory.getOcrData(
      eidPm,
      (ocrResult) => {
        if (isEmptyObject(ocrResult)) return;
        const ocrDataVm = {
          cardNumber: ocrResult.cardNumber,
          cardType: ocrResult.cardType,
          dateOfBirth: ocrResult.dateofBirth,
          errorMessage: ocrResult.errorMessage,
          expiryDate: ocrResult.expiryDate,
          gender: ocrResult.gender,
          idNumber: ocrResult.idNumber,
          isDispute: ocrResult.isDispute,
          isDuplicate: ocrResult.isDuplicate,
          isValidate: ocrResult.isValidate,
          name: ocrResult.name,
          status: ocrResult.status,
        };
        successCallback(ocrDataVm);
      },
      errorCallback
    );
  };

  downloadReceipt = async (id, memberId) => {
    await membersRepostory.downloadReceipt(id, memberId);
  };

  getMembershipDetails = async (id, callback) => {
    await membersRepostory.getMembershipDetails(id, (membershipPm) => {
      callback(membershipPm);
    });
  };

  getMemberViewerDetails = async (id, callback) => {
    await membersRepostory.getMemberViewerDetails(id, (member) => {
      console.log('calling...', member);
      callback(member);
    });
  };

  getDisputeInfoForMember = async (eid, callback) => {
    await membersRepostory.getDisputeInfoForMember(eid, callback);
  };

  downloadMembersExcel = async (searchDto, callback) => {
    await membersRepostory.downloadMembersExcel(searchDto, callback);
  };
}
