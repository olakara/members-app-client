import membersRepostory from './members.repository';

export default class MembersPresenter {
  load = async (callback) => {
    await membersRepostory.getMembers((membersPm) => {
      const membersVm = membersPm.map((memberPm) => {
        return {
          id: memberPm.id,
          fullName: memberPm.fullName,
          mandalam: memberPm.mandalam.name,
          area: memberPm.area.name,
          panchayat: memberPm.panchayat.name,
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
}
