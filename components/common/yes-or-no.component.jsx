import { FormContext } from '../../shared/form-context';
import { useContext } from 'react';

function YesOrNoComponent(props) {
  const { name, value } = props;

  const formContext = useContext(FormContext);
  const { handleFormChange } = formContext;

  const handleChange = (event) => {
    const { checked } = event.target;

    event.target.value = checked ? value : '';

    handleFormChange(event);
  };

  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          aria-describedby={name}
          name={name}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          onChange={handleChange}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          Yes
        </label>
      </div>
      <div className="flex h-5 pl-5">
        <input
          aria-describedby={name}
          name={name}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          onChange={handleChange}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          No
        </label>
      </div>
    </div>
  );
}

export default YesOrNoComponent;
