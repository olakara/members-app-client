import lookupsRepository from './lookups.repository';

export default class LookupsPresenter {
  loadGeneralLookups = async (callback) => {
    lookupsRepository.getLookups((lookupPm) => {
      const lookupsVm = {
        areas: lookupPm.areas ?? [],
        districts: lookupPm.districts ?? [],
        states: lookupPm.states ?? [],
        professions: lookupPm.professions ?? [],
        qualifications: lookupPm.qualifications ?? [],
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
        areas: this.getLookupsVm(lookupPm.areas ?? []),
        district: this.getLookupsVm(lookupPm.district) ?? [],
        panchayats: this.getPanchayatsVm(lookupPm.panchayats ?? []),
        cascadeTitle: lookupPm.cascadeTitle,
        stateName: lookupPm.stateName,
        districtsName: lookupPm.districtsName,
        canDisputeCommittee: lookupPm.canDisputeCommittee,
      };
      callback(lookupsVm);
    });
  };

  loadProfessions = async (callback) => {
    lookupsRepository.getProfessions((professionsPm) => {
      const professionsVm = {
        professions: this.getLookupsVm(professionsPm ?? []),
      };
      callback(professionsVm);
    });
  };

  loadQualifications = async (callback) => {
    lookupsRepository.getQualifications((qualificationsPm) => {
      const qualificationsVm = {
        qualifications: this.getLookupsVm(qualificationsPm ?? []),
      };
      callback(qualificationsVm);
    });
  };

  loadRegisteredOrganizations = async (callback) => {
    lookupsRepository.getRegisteredOrganizations((organizationsPm) => {
      const organizationsVm = this.getLookupsVm(organizationsPm ?? []);
      callback(organizationsVm);
    });
  };

  loadWelfareSchemes = async (callback) => {
    lookupsRepository.getWelfareSchemes((schemesPm) => {
      const schemesVm = this.getLookupsVm(schemesPm ?? []);
      callback(schemesVm);
    });
  };

  getPanchayatsVm = (panchayats) => {
    if (panchayats.length) {
      return panchayats.map((item) => {
        return {
          id: item.id,
          name: item.name,
          mandalam: item.mandalam,
        };
      });
    } else {
      return [];
    }
  };

  loadMandalams = async (id, callback) => {
    lookupsRepository.getMandalams(id, (mandalamsPm) => {
      const mandalamsVm = {
        mandalams: this.getLookupsVm(mandalamsPm ?? []),
      };
      callback(mandalamsVm);
    });
  };

  loadPanchayaths = async (id, callback) => {
    lookupsRepository.getPanchayaths(id, (panchayathsPm) => {
      const panchayathsVm = {
        panchayaths: this.getLookupsVm(panchayathsPm ?? []),
      };
      callback(panchayathsVm);
    });
  };

  getLookupsVm = (items) => {
    if (!items) return;
    return items.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  };
}
