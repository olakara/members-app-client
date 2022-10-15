import { FormContext } from '../../shared/form-context';
import FormCheckbox from './form-checkbox.component';
import { useContext, useState } from 'react';

function YesOrNoComponent(props) {
  const { name, value } = props;

  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);

  const formContext = useContext(FormContext);
  const { handleFormChange } = formContext;

  const handleChange = (event) => {
    const { value } = event.target;
    //event.target.value = checked ? value : '';
    console.log(value);
    handleFormChange(event);
  };

  const handleYes = (event) => {
    if (event.target.value) {
      setYesChecked(true);
      setNoChecked(false);
    } else setYesChecked(false);
  };

  const handleNo = (event) => {
    if (event.target.value) {
      setNoChecked(true);
      setYesChecked(false);
    } else setNoChecked(false);
  };

  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <FormCheckbox label="Yes" value="Yes" onChange={handleYes} checked={yesChecked}></FormCheckbox>
      </div>

      <div className="flex h-5 pl-5">
        <FormCheckbox label="No" value="No" onChange={handleNo} checked={noChecked}></FormCheckbox>
      </div>
    </div>
  );
}

export default YesOrNoComponent;
