import { isEmptyObject } from '../utilities';
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
      if (!lookupPm || isEmptyObject(lookupPm)) return;
      console.log('Lookup', lookupPm);
      if (typeof lookupPm.agentDistrictId === 'undefined' || typeof lookupPm.agentMandalamId === 'undefined') return;
      const lookupsVm = {
        agentDistrictId: lookupPm.agentDistrictId,
        agentMandalamId: lookupPm.agentMandalamId,
        applicableUserRole: lookupPm.applicableUserRole,
        areas: this.getLookupsVm(lookupPm.areas ?? []),
        canDisputeCommittee: lookupPm.canDisputeCommittee,
        cascadeData: lookupPm.cascadeData,
        cascadeTitle: lookupPm.cascadeTitle,
        district: this.getLookupsVm(lookupPm.district) ?? [],
        districtsName: lookupPm.districtsName,
        panchayats: this.getPanchayatsVm(lookupPm.panchayats ?? []),
        stateName: lookupPm.stateName,
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

  loadMandalamsForAgent = async (id, callback) => {
    lookupsRepository.getMandalamsForAgent(id, (mandalamsPm) => {
      const mandalamsVm = {
        mandalams: this.getLookupsVm(mandalamsPm ?? []),
      };
      callback(mandalamsVm);
    });
  };

  loadPanchayathsForAgent = async (id, callback) => {
    lookupsRepository.getPanchayathsForAgent(id, (panchayathsPm) => {
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
