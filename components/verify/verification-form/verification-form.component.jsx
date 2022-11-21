import { useEffect } from 'react';
import { useState } from 'react';
import { FormContext } from '../../../shared/form-context';
import VerifyImageComponent from '../../common/verify-image.component';
import MembershipInfoComponent from './membership-info.component';
import YesOrNoComponent from '../../common/yes-or-no.component';

function VerificationFormComponent(props) {
  const { submit = () => {}, member } = props;
  const [form, setForm] = useState({});
  const [isFormInValid, setFormInvalid] = useState(false);

  const [isDisableFormDueToEID, setDisableFormDueToEID] = useState({});

  const initalValue = {
    id: member?.id,
    ediFrontAndBackSideValid: null,
    eidNumberValid: null,
    eidFullNameValid: null,
    eidNationalityValid: null,
    eidDOBValid: null,
    eidDOEValid: null,
    passportFirstPageValid: null,
    passportLastPageValid: null,
    cardType: 0,
    gender: null,
    eidIssuePlaceValid: null,
    verifiedUserId: null,
  };

  useEffect(() => {
    setForm(initalValue);
  }, [member]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ediFrontAndBackSideValid' && value === 'No') {
      setDisableFormDueToEID(true);
    } else {
      setDisableFormDueToEID(false);
    }

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    submit(form);
  };

  const isEmiratesIDBad = () => {
    return form.ediFrontAndBackSideValid === 'No';
  };

  const checkForPassportValidity = () => {
    if (member?.state === 'DUBAI') return form.passportFirstPageValid && form.passportLastPageValid;
    else return true;
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/2 py-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Emirates ID Front</h3>
          <VerifyImageComponent id={member?.id} type="front" />
        </div>
        <div className="basis-1/2 py-2 overflow-hidden shadow-md sm:rounded-lg bg-slate-100">
          <MembershipInfoComponent member={member}></MembershipInfoComponent>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2 py-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Emirates ID Back</h3>
          <VerifyImageComponent id={member?.id} type="back" />
        </div>
        <div className="basis-1/2 py-2 overflow-hidden shadow-md sm:rounded-lg bg-slate-100">
          <div className="px-4 py-2 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Member Verification</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <form onSubmit={handleFormSubmit} id="verify-form">
              <FormContext.Provider value={{ form, handleFormChange }}>
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid front and back side</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="ediFrontAndBackSideValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid Emirates ID number</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="eidNumberValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="eidFullNameValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid Nationality</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="eidNationalityValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid date of exipry</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="eidDOEValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid date of birth</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="eidDOBValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid issued place</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="eidIssuePlaceValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  {member?.state === 'DUBAI' && (
                    <>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Passport first page valid</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <YesOrNoComponent name="passportFirstPageValid"></YesOrNoComponent>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Passport last page valid</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <YesOrNoComponent name="passportLastPageValid"></YesOrNoComponent>
                        </dd>
                      </div>
                    </>
                  )}
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <label htmlFor="male" className="font-medium text-gray-700">
                            <input
                              aria-describedby="male"
                              name="gender"
                              type="radio"
                              value="0"
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer disabled:cursor-not-allowed"
                              onChange={handleFormChange}
                            />
                            <span className="ml-3 text-sm">Male</span>
                          </label>
                        </div>

                        <div className="flex h-5 pl-5">
                          <label htmlFor="gender" className="font-medium text-gray-700">
                            <input
                              aria-describedby="female"
                              name="gender"
                              type="radio"
                              value="1"
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer disabled:cursor-not-allowed"
                              onChange={handleFormChange}
                              disabled={isDisableFormDueToEID}
                            />
                            <span className="ml-3 text-sm">Female</span>
                          </label>
                        </div>
                      </div>
                    </dd>
                  </div>
                  {isFormInValid && (
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3 sm:px-6">
                      <dt className="text-sm font-medium text-red-700">Form Incomplete!</dt>
                      <dd className="mt-1 text-sm text-red-700 sm:col-span-2 sm:mt-0">
                        Please make sure you have selected an answer for all the validation questions before submitting!
                      </dd>
                    </div>
                  )}
                </dl>
              </FormContext.Provider>
              <button
                id="next-button"
                title="Submit"
                type="submit"
                className="float-right mr-3 inline-flex justify-right py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerificationFormComponent;
