import { useEffect } from 'react';
import { useState } from 'react';
import { FormContext } from '../../../shared/form-context';
import VerifyImageComponent from '../../common/verify-image.component';
import MembershipInfoComponent from './membership-info.component';
import YesOrNoComponent from '../../common/yes-or-no.component';

function VerificationFormComponent(props) {
  const { submit = () => {}, member } = props;
  const [form, setForm] = useState({});

  const [image, setImage] = useState({});

  const initalValue = {
    id: member?.id,
    ediFrontAndBackSideValid: false,
    eidNumberValid: false,
    eidFullNameValid: false,
    eidNationalityValid: false,
    eidDOBValid: false,
    eidDOEValid: false,
    passportFirstPageValid: false,
    passportLastPageValid: false,
    cardType: 0,
    gender: 0,
    eidIssuePlaceValid: false,
    verifiedUserId: null,
  };

  useEffect(() => {
    setImage({
      image: 'https://picsum.photos/seed/000/1920/1080',
    });
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

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

  return (
    <>
      {JSON.stringify(member)}
      <div className="flex flex-row">
        <div className="basis-1/2 py-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Emirates ID Front</h3>
          <VerifyImageComponent props={member?.eidFrontPage} />
        </div>
        <div className="basis-1/2 py-2 overflow-hidden shadow-md sm:rounded-lg">
          <MembershipInfoComponent member={member}></MembershipInfoComponent>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2 py-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Emirates ID Back</h3>
          <VerifyImageComponent props={member?.eidLastPage} />
        </div>
        <div className="basis-1/2 py-2 overflow-hidden shadow-md sm:rounded-lg">
          <div className="px-4 py-2 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Member Verification</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <form onSubmit={handleFormSubmit}>
              <FormContext.Provider value={{ form, handleFormChange }}>
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid front and back side</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent name="ediFrontAndBackSideValid"></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid Emirates ID number</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid Nationality</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid date of exipry</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid date of birth</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Valid issued place</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent></YesOrNoComponent>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <YesOrNoComponent></YesOrNoComponent>
                    </dd>
                  </div>
                </dl>
              </FormContext.Provider>
              <button
                id="next-button"
                title="Next"
                type="submit"
                className="ml-3 inline-flex justify-right py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
      {JSON.stringify(initalValue)}
    </>
  );
}

export default VerificationFormComponent;
