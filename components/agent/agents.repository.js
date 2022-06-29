import { config } from '../../shared/constants';
import httpGateway from "../../shared/http-gateway";
import Observable from "../../shared/observable";


class AgentsRepository {
   
    programmersModel = null;
    
    constructor() {
        this.programmersModel = new Observable([]);
    }

    getAgents = async callback => {
        this.programmersModel.subscribe(callback);
        await this.loadData();
        this.programmersModel.notify();
    };

    createAgent = async (agentPm, successCallback, errorCallback) => {
        
        const agentDto = {
            fullName : agentPm.fullName,
            email: agentPm.email,
            mobileNumber: agentPm.mobileNumber,
            alternativeContactNumber: agentPm.alternativeContactNumber,
            designation: agentPm.designation,
            role: agentPm.role,
            cascadeId: agentPm.cascadeId
        };

        let result = await httpGateway.post(config.BASE_URL + 'users/', agentDto);

        if(result.success) {
            successCallback();
        } else {
            errorCallback(result);
        }
    };

    activateAgent = async (agentId) => {
        let result = await httpGateway.put(config.BASE_URL + 'users/activate/' + agentId);
         if(result.success) {
            await this.loadData();
            this.programmersModel.notify();
        }
        return result;
    };

    deactivateAgent = async(agentId) => {
        let result = await httpGateway.put(config.BASE_URL + 'users/deactivate/' + agentId);
        if(result.success) {
            await this.loadData();
            this.programmersModel.notify();
        }
        return result;
    };

    loadData = async () => {
        const agentsDto = await httpGateway.get(config.BASE_URL + "users/role");
        this.programmersModel.value = agentsDto.map(agentDto => {
            return agentDto;
        })
    };
}

const agentsRepository = new AgentsRepository();
export default agentsRepository;