import membersRepostory from './members.repository';
import { isEmptyObject } from '../../shared/utilities';

export default class MembersPresenter {
  load = async (callback) => {
    await membersRepostory.getMembers((membersPm) => {
      const membersVm = membersPm.map((memberPm) => {
        return {
          id: memberPm.id,
          membershipId: memberPm.membershipId,
          fullName: memberPm.fullName,
          panchayat: memberPm.panchayat.name,
          mobile: memberPm.mobileNumber,
        };
      });
      callback(membersVm);
    });
  };

  createMember = async (memberPm, successCallback, errorCallback) => {
    await membersRepostory.createMember(memberPm, successCallback, errorCallback);
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

  getDisputeInfoForMember = async (eid, callback) => {
    await membersRepostory.getDisputeInfoForMember(eid, callback);
  };
}
