import { config } from '../../shared/constants';
import Observable from '../../shared/observable';
import httpGateway from '../../shared/http-gateway';

class DisputeRepository {
  disputesProgrammersModel = null;
  disputeProgrammersModel = null;

  constructor() {
    this.disputesProgrammersModel = new Observable([]);
    this.disputeProgrammersModel = new Observable({});
  }

  getDisputes = async (callback) => {
    this.disputesProgrammersModel.subscribe(callback);
    await this.loadData();
    this.disputesProgrammersModel.notify();
  };

  getDisputedInfo = async (eid, callback) => {
    this.disputeProgrammersModel.subscribe(callback);
    await this.loadDisputedInfo(eid);
    this.disputeProgrammersModel.notify();
  };

  loadData = async () => {
    const dto = await httpGateway.get(config.BASE_URL + 'disputes/role');
    this.disputesProgrammersModel.value = dto;
  };
}

const disputeRepository = new DisputeRepository();
export default disputeRepository;
