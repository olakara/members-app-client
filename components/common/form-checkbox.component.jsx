import { FormContext } from '../../shared/form-context';
import { useContext } from 'react';

function FormCheckbox(props) {
  const { label, name, value, onChange, checked } = props;

  const formContext = useContext(FormContext);
  const { handleFormChange } = formContext;

  const handleChange = (event) => {
    const { checked } = event.target;

    event.target.value = checked ? value : '';
    onChange(event);
    handleFormChange(event);
  };

  return (
    <label htmlFor={name} className="font-medium text-gray-700">
      <input
        aria-describedby={name}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        onChange={handleChange}
        checked={checked}
      />
      <span className="ml-3 text-sm">{label}</span>
    </label>
  );
}

export default FormCheckbox;
