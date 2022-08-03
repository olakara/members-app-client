import { useState, useEffect } from 'react';
import CounterWidget from './counter-widget';
import DashboardPresenter from './dashboard.presenter';
function DashboardComponent() {
  const [widgets, setWidgets] = useState([]);

  const dashboardPresenter = new DashboardPresenter();

  useEffect(() => {
    async function load() {
      await dashboardPresenter.load((generatedViewModel) => {
        setWidgets(generatedViewModel);
      });
    }
    load();
  }, []);
  return (
    <div className="py-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {widgets &&
          widgets.map((widget, index) => {
            return (
              <dl className="px-2 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-6" key={index}>
                <CounterWidget vm={widget} color="red" />
                <WidgetIterator vm={widget.details} />
              </dl>
            );
          })}
        {/* <CounterWidget vm={vm} color="orange" /> */}
      </main>
    </div>
  );
}

function WidgetIterator(props) {
  return (
    <>
      {props.vm.map((widget, index) => {
        return <CounterWidget vm={widget} key={index} color="blue" />;
      })}
    </>
  );
}

export default DashboardComponent;
