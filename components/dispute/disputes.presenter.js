import disputeRepository from './disputes.repository';

export default class DisputePresenter {
  load = async (callback) => {
    await disputeRepository.getDisputes((disputesPm) => {
      const disputesVm = disputesPm.map((disputePm) => {
        return {
          id: disputePm.id,
          membershipNo: disputePm.member.membershipId,
          fullName: disputePm.member.fullName,
          location: disputePm.disputeType,
        };
      });
      callback(disputesVm);
    });
  };

  getDispute = async (id, callback) => {
    await disputeRepository.getDispute(id, callback);
  };
}
