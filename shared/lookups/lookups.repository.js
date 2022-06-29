import { config } from '../../shared/constants';
import httpGateway from "../../shared/http-gateway";
import Observable from "../../shared/observable";

class LookupsRepository {
   
    generalLookupsProgrammersModel = null;
    userLookupsProgrammersModel = null;
    
    constructor() {
        this.generalLookupsPogrammersModel = new Observable({});
        this.userLookupsProgrammersModel = new Observable({})
    }

    getLookups = async callback => {
        this.generalLookupsPogrammersModel.subscribe(callback);
        await this.loadGeneralLookupsData();
        this.generalLookupsPogrammersModel.notify();
    }

    getUserLookups = async callback => {
        this.userLookupsProgrammersModel.subscribe(callback);
        await this.loadUserLookups();
        this.userLookupsProgrammersModel.notify();
    }

    loadGeneralLookupsData = async () => {
        const lookupsDto = await httpGateway.get(config.BASE_URL + "lookups/");
        this.generalLookupsPogrammersModel.value = lookupsDto;
    }

    loadUserLookups = async () => {
        const lookupsDto = await httpGateway.get(config.BASE_URL + "lookups/me");
        this.userLookupsProgrammersModel.value = lookupsDto;
    }
}

const lookupsRepository = new LookupsRepository();
export default lookupsRepository;