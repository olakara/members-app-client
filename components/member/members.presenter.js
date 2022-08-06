import membersRepostory from './members.repository';

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
    await membersRepostory.getOcrData(eidPm, successCallback, errorCallback);
  };

  downloadReceipt = async (id, memberId) => {
    await membersRepostory.downloadReceipt(id, memberId);
  };
}
