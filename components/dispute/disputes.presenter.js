import disputeRepository from './disputes.repository';

export default class DisputePresenter {
  load = async (callback) => {
    await disputeRepository.getDisputes((disputesPm) => {
      console.log('data', disputesPm);
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
}
