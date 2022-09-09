import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class AgentsRepository {
  programmersModel = null;

  constructor() {
    this.programmersModel = new Observable({});
  }

  getAgents = async (callback, searchDto) => {
    this.programmersModel.subscribe(callback);
    await this.loadData(searchDto);
    this.programmersModel.notify();
  };

  createAgent = async (agentPm, successCallback, errorCallback) => {
    const agentDto = {
      fullName: agentPm.fullName,
      email: agentPm.email,
      mobileNumber: agentPm.mobileNumber,
      designation: agentPm.designation,
      role: agentPm.role,
      cascadeId: agentPm.cascadeId,
    };

    let result = await httpGateway.post(config.BASE_URL + 'users/', agentDto);
    if (result.success) {
      successCallback();
    } else {
      errorCallback(result);
    }
  };

  activateAgent = async (agentId) => {
    let result = await httpGateway.put(config.BASE_URL + 'users/activate/' + agentId);
    if (result.success) {
      await this.loadData();
      this.programmersModel.notify();
    }
    return result;
  };

  deactivateAgent = async (agentId) => {
    let result = await httpGateway.put(config.BASE_URL + 'users/deactivate/' + agentId);
    if (result.success) {
      await this.loadData();
      this.programmersModel.notify();
    }
    return result;
  };

  resetPassword = async (agentPm, successCallback, errorCallback) => {
    const agentDto = {
      userId: agentPm.id,
      email: agentPm.email,
    };
    let result = await httpGateway.post(config.BASE_URL + 'users/resetpassword', agentDto);
    if (result.success) {
      successCallback(result);
    } else {
      errorCallback(result);
    }
  };

  loadData = async (searchDto) => {
    const agentsDto = await httpGateway.post(config.BASE_URL + 'users/role', searchDto);
    this.programmersModel.value = agentsDto;
  };
}

const agentsRepository = new AgentsRepository();
export default agentsRepository;
