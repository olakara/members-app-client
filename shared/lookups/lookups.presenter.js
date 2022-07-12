import lookupsRepository from './lookups.repository';

export default class LookupsPresenter {
  loadGeneralLookups = async (callback) => {
    lookupsRepository.getLookups((lookupPm) => {
      const lookupsVm = {
        areas: lookupPm.areas,
        districts: lookupPm.districts,
        states: lookupPm.states,
        professions: lookupPm.professions,
        qualifications: lookupPm.qualifications,
        membershipPeriod: lookupPm.membershipPeriod,
      };
      callback(lookupsVm);
    });
  };

  loadUserLookups = async (callback) => {
    lookupsRepository.getUserLookups((lookupPm) => {
      const lookupsVm = {
        applicableUserRole: lookupPm.applicableUserRole,
        cascadeData: lookupPm.cascadeData,
        areas: lookupPm.areas,
        panchayats: lookupPm.panchayats,
        cascadeTitle: lookupPm.cascadeTitle,
      };
      callback(lookupsVm);
    });
  };

  loadProfessions = async (callback) => {
    lookupsRepository.getProfessions((professionsPm) => {
      const professionsVm = {
        professions: professionsPm.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        }),
      };
      callback(professionsVm);
    });
  };

  loadQualifications = async (callback) => {
    lookupsRepository.getQualifications((qualificationsPm) => {
      const qualificationsVm = {
        qualifications: qualificationsPm.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        }),
      };
      callback(qualificationsVm);
    });
  };
}
