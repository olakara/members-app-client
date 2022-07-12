import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class LookupsRepository {
  generalLookupsProgrammersModel = null;
  userLookupsProgrammersModel = null;
  professionsProgrammersModel = null;
  qualificationsProgrammersModel = null;

  constructor() {
    this.generalLookupsPogrammersModel = new Observable({});
    this.userLookupsProgrammersModel = new Observable({});
    this.professionsProgrammersModel = new Observable([]);
    this.qualificationsProgrammersModel = new Observable([]);
  }

  getLookups = async (callback) => {
    this.generalLookupsPogrammersModel.subscribe(callback);
    await this.loadGeneralLookupsData();
    this.generalLookupsPogrammersModel.notify();
  };

  getUserLookups = async (callback) => {
    this.userLookupsProgrammersModel.subscribe(callback);
    await this.loadUserLookups();
    this.userLookupsProgrammersModel.notify();
  };

  getProfessions = async (callback) => {
    this.professionsProgrammersModel.subscribe(callback);
    await this.loadProfessions();
    this.professionsProgrammersModel.notify();
  };

  getQualifications = async (callback) => {
    this.qualificationsProgrammersModel.subscribe(callback);
    await this.loadQualifications();
    this.qualificationsProgrammersModel.notify();
  };

  loadGeneralLookupsData = async () => {
    const lookupsDto = await httpGateway.get(config.BASE_URL + 'lookups/');
    this.generalLookupsPogrammersModel.value = lookupsDto;
  };

  loadUserLookups = async () => {
    const lookupsDto = await httpGateway.get(config.BASE_URL + 'lookups/me');
    this.userLookupsProgrammersModel.value = lookupsDto;
  };

  loadProfessions = async () => {
    const professionsDto = await httpGateway.get(config.BASE_URL + 'professions');
    this.professionsProgrammersModel.value = professionsDto;
  };

  loadQualifications = async () => {
    const qualificationsDto = await httpGateway.get(config.BASE_URL + 'qualifications');
    this.qualificationsProgrammersModel.value = qualificationsDto;
  };
}

const lookupsRepository = new LookupsRepository();
export default lookupsRepository;
