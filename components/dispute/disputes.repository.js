import { config } from '../../shared/constants';
import Observable from '../../shared/observable';
import httpGateway from '../../shared/http-gateway';

class DisputeRepository {
  disputesProgrammersModel = null;
  disputeInfoProgrammersModel = null;
  disputeProgrammersModel = null;

  constructor() {
    this.disputesProgrammersModel = new Observable([]);
    this.disputeInfoProgrammersModel = new Observable({});
    this.disputeProgrammersModel = new Observable({});
  }

  getDisputes = async (callback) => {
    this.disputesProgrammersModel.subscribe(callback);
    await this.loadData();
    this.disputesProgrammersModel.notify();
  };

  getDispute = async (id, callback) => {
    this.disputeProgrammersModel.subscribe(callback);
    if (id) {
      await this.loadDisputeData(id);
      this.disputeProgrammersModel.notify();
    }
  };

  getDisputedInfo = async (eid, callback) => {
    this.disputeInfoProgrammersModel.subscribe(callback);
    await this.loadDisputedInfo(eid);
    this.disputeInfoProgrammersModel.notify();
  };

  rejectDispute = async (disputePm, successCallback, errorCallback) => {
    const disputeDto = {
      requestId: disputePm.id,
      justificationComment: disputePm.justification,
    };

    let result = await httpGateway.put(config.BASE_URL + 'disputes/reject/' + disputePm.id, disputeDto);
    if (result.success) {
      successCallback(result);
    } else {
      errorCallback(result);
    }
  };

  approveDispute = async (disputePm, successCallback, errorCallback) => {
    const disputeDto = {
      requestId: disputePm.id,
      justificationComment: disputePm.justification,
    };

    let result = await httpGateway.put(config.BASE_URL + 'disputes/approve/' + disputePm.id, disputeDto);
    if (result.success) {
      successCallback(result);
    } else {
      errorCallback(result);
    }
  };

  loadDisputeData = async (id) => {
    const dto = await httpGateway.get(config.BASE_URL + 'disputes/' + id);
    this.disputeProgrammersModel.value = dto;
  };

  loadData = async () => {
    const dto = await httpGateway.get(config.BASE_URL + 'disputes/role');
    this.disputesProgrammersModel.value = dto;
  };
}

const disputeRepository = new DisputeRepository();
export default disputeRepository;
