import { isEmptyObject } from '../../shared/utilities';
import verifyRepository from './verify.repository';

export default class VerifyPresenter {
  initVerification = async (callback) => {
    await verifyRepository.initVerification((verifyIdPm) => {
      if (!verifyIdPm || isEmptyObject(verifyIdPm)) return;
      const { data } = verifyIdPm;
      callback(data?.id);
    });
  };

  getMembershipVerfication = async (id, callback) => {
    await verifyRepository.getMembershipVerfication(id, (membershipDetailsPm) => {
      if (!membershipDetailsPm || isEmptyObject(membershipDetailsPm)) return;
      let member = {
        id: membershipDetailsPm.id,
        memberId: membershipDetailsPm.memberId,
        membershipId: membershipDetailsPm.member.membershipId,
        fullName: membershipDetailsPm.member.fullName,
        emiratesId: membershipDetailsPm.member.emiratesIdNumber,
        expiry: membershipDetailsPm.member.emiratesIdExpiry,
        dob: membershipDetailsPm.member.dateOfBirth,
        state: membershipDetailsPm.member.state,
        eidFrontPage: membershipDetailsPm.eidFrontPage,
        eidLastPage: membershipDetailsPm.eidLastPage,
        passportFirstPage: membershipDetailsPm.passportFirstPage,
        passportLastPage: membershipDetailsPm.passportLastPage,
      };
      console.log('member:', membershipDetailsPm, member);
      callback(member);
    });
  };
}
