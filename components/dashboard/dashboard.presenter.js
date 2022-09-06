import dashboardRepository from './dashboard.repository';

export default class DashboardPresenter {
  load = async (callback) => {
    await dashboardRepository.getAllWidgets((widgetsPm) => {
      const widgetsVm = widgetsPm.map((widgetPm) => {
        return {
          no: widgetPm.no,
          title: widgetPm.title,
          value: widgetPm.summaryValue || widgetPm.summaryText || '0',
          details: widgetPm.details.map((item) => {
            return {
              title: item.text,
              value: item.intValue || item.textValue,
            };
          }),
        };
      });
      callback(widgetsVm);
    });
  };
}
