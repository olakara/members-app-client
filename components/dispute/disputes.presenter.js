import { isEmptyObject } from '../../shared/utilities';
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
    await disputeRepository.getDispute(id, (disputePm) => {
      if (!disputePm || isEmptyObject(disputePm)) return;
      const disputeVm = {
        id: disputePm.id,
        memberId: disputePm.memderId,
        membershipNo: disputePm.member.membershipId,
        fullName: disputePm.member.fullName,
        mobile: disputePm.member.mobileNumber,
        toState: disputePm.toState.name,
        toArea: disputePm.toArea.name,
        toDistrict: disputePm.toDistrict.name,
        toMandalam: disputePm.toMandalam.name,
        toPanchayat: disputePm.toPanchayat.name,
        fromState: disputePm.fromState.name,
        fromArea: disputePm.fromArea.name,
        fromDistrict: disputePm.fromDistrict.name,
        fromMandalam: disputePm.fromMandalam.name,
        fromPanchayat: disputePm.fromPanchayat.name,
        reason: disputePm.reason,
        isCanApprove: disputePm.isCanApprove,
        submittedBy: disputePm.submittedBy,
        submittedDate: disputePm.submittedDate,
        justificationComment: disputePm.justificationComment,
        actionDate: disputePm.actionDate,
        actionBy: disputePm.actionBy,
        status: this.getDisputeStatusText(disputePm.status),
      };
      callback(disputeVm);
    });
  };

  rejectDispute = async (disputePm, successCallback, errorCallback) => {
    await disputeRepository.rejectDispute(disputePm, successCallback, errorCallback);
  };

  approveDispute = async (disputePm, successCallback, errorCallback) => {
    await disputeRepository.approveDispute(disputePm, successCallback, errorCallback);
  };

  getDisputeStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      case 2:
        return 'Rejected';
    }
  };
}
