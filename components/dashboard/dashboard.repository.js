import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class DashboardRepository {
  programmersModel = null;

  constructor() {
    this.programmersModel = new Observable([]);
  }

  getAllWidgets = async (callback) => {
    this.programmersModel.subscribe(callback);
    await this.loadData();
    this.programmersModel.notify();
  };

  loadData = async () => {
    const dto = await httpGateway.get(config.BASE_URL + 'widgets');

    this.programmersModel.value = dto.map((item) => {
      return item;
    });
  };
}
const dashboardRepository = new DashboardRepository();
export default dashboardRepository;
