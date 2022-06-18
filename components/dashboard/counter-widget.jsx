import classNames from 'classnames';

export default function CounterWidget(props) {

   let widgetStyles = classNames({
      'px-4 py-5 bg-gradient-to-tl shadow-md rounded-lg overflow-hidden sm:p-6': true,
      'from-red-400 to-pink-400' : props.color === 'red',
      'from-orange-400 to-yellow-400' : props.color === 'orange',
      'from-blue-400 to-emerald-400' : props.color === 'blue',
   })

 return (
     <div className={widgetStyles}>
        <dt className="text-sm font-medium text-white truncate">{props.vm.title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-white">{props.vm.countValue}</dd>
     </div>
    
  )
}