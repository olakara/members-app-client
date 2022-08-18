import disputeRepository from './disputes.repository';

export default class DisputePresenter {
  load = async (callback) => {
    await disputeRepository.getDisputes((disputesPm) => {
      console.log('data', disputesPm);
      const disputesVm = disputesPm.map((disputePm) => {
        return {
          disputePm,
        };
      });
    });
  };
}
