import classNames from 'classnames';

export default function CounterWidget(props) {
  let widgetStyles = classNames({
    'bg-gradient-to-tl shadow-xl rounded-lg overflow-hidden p-1': true,
    'from-red-400 to-pink-400': props.color === 'red' && !props.vm.isDispute,
    'from-yellow-400 to-cyan-400': props.color === 'orange' || props.vm.isDispute,
    'from-blue-400 to-emerald-400': props.color === 'blue' && !props.vm.isDispute,
  });

  return (
    <div className={widgetStyles}>
      <div className="backdrop-blur-sm bg-white/20 p-2">
        <dt className="text-xl font-medium  text-white truncate capitalize" title={props.vm.title}>
          {props.vm.title}
        </dt>
        <dd className="mt-1 text-3xl font-mono text-white">{props.vm.value}</dd>
      </div>
    </div>
  );
}
