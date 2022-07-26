import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import LookupsPresenter from '../shared/lookups/lookups.presenter';
import MemberPresenter from '../components/member/members.presenter';
import HeaderComponent from '../components/common/header.component';
import UploadsPresenter from '../shared/uploads/uploads.presenter';
import FormErrorComponent from '../components/common/form-error.component';
import ImagePreviewComponent from '../components/common/image-preview.component';

export default function CreateMemberPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [moving, setMoving] = useState('right');

  const [steps, setSteps] = useState([
    { name: 'Step 1', href: '#', status: 'current' },
    { name: 'Step 2', href: '#', status: 'upcoming' },
    { name: 'Step 3', href: '#', status: 'upcoming' },
    { name: 'Step 4', href: '#', status: 'upcoming' },
  ]);

  const prevStep = () => {
    setMoving('left');
    setSteps((old) =>
      old.map((v, i) => {
        if (i === currentStep) {
          v.status = 'upcoming';
        } else if (i === currentStep - 1) {
          v.status = 'current';
        }
        return v;
      })
    );
    setCurrentStep(currentStep - 1);
    return false;
  };

  const nextStep = async () => {
    setMoving('right');
    // getValues('firstname')

    if (true) {
      setSteps((old) =>
        old.map((v, i) => {
          if (i === currentStep) {
            v.status = 'complete';
          } else if (i === currentStep + 1) {
            v.status = 'current';
          }
          return v;
        })
      );
      setCurrentStep(currentStep + 1);
    }
    return false;
  };

  const [userLookups, copyUserLookupsToStateViewModel] = useState(null);
  const [professionsLookup, copyProfessionsToStateViewModel] = useState(null);
  const [qualificationsLookup, copyQualificationsToStateViewModel] = useState(null);
  const [organizationsLookup, copyOrganizationsToStateViewModel] = useState(null);
  const [welfareSchemesLookup, copyWelfareSchemesToStateViewModel] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [emiratesIdNumber, setEmiratesId] = useState('');
  const [emiratesIdExpiry, setEmiratesIdExpiry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobile, setMobile] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [email, setEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [profession, setProfession] = useState('');
  const [qualification, setQualification] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [houseName, setHouseName] = useState('');
  const [addressIndia, setAddressIndia] = useState('');
  const [area, setArea] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [registeredOrganization, setRegisteredOrganization] = useState('');
  const [welfareScheme, setWelfareScheme] = useState('');

  const [emiratesIdFrontImagePath, setEmiratesIdFrontImagePath] = useState(null);
  const [emiratesIdBackImagePath, setEmiratesIdBackImagePath] = useState(null);
  const [photoImagePath, setPhotoImagePath] = useState(null);

  const memberPresenter = new MemberPresenter();
  const lookupsPresenter = new LookupsPresenter();
  const uploadPresenter = new UploadsPresenter();

  const wrapper = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(1);

  useEffect(() => {
    async function load() {
      await lookupsPresenter.loadUserLookups((generatedViewModel) => {
        console.log('User lookups', generatedViewModel);
        copyUserLookupsToStateViewModel(generatedViewModel);
      });

      await lookupsPresenter.loadProfessions((generatedViewModel) => {
        console.log('Professions', generatedViewModel);
        copyProfessionsToStateViewModel(generatedViewModel.professions);
      });

      await lookupsPresenter.loadQualifications((generatedViewModel) => {
        console.log('Qualifications', generatedViewModel);
        copyQualificationsToStateViewModel(generatedViewModel.qualifications);
      });

      await lookupsPresenter.loadRegisteredOrganizations((generatedViewModel) => {
        console.log('Registered Orgranizations', generatedViewModel);
        copyOrganizationsToStateViewModel(generatedViewModel);
      });

      await lookupsPresenter.loadWelfareSchemes((generatedViewModel) => {
        console.log('Welfare Schemes', generatedViewModel);
        copyWelfareSchemesToStateViewModel(generatedViewModel);
      });
    }

    function handleResize() {
      if (wrapper.current !== null) {
        setWrapperWidth(wrapper.current.offsetWidth);
      }
    }

    load();
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create DTO
    let memberForm = {
      fullName,
      emiratesIdNumber,
      emiratesIdExpiry,
      dateOfBirth,
      mobile,
      alternateMobile,
      email,
      passportNumber,
      passportExpiry,
      profession,
      qualification,
      bloodGroup,
      houseName,
      addressIndia,
      area,
      panchayat,
      registeredOrganization,
      welfareScheme,
    };

    console.log('Member Form', memberForm);

    await memberPresenter.createMember(
      memberForm,
      (success) => {
        Router.push('/home');
      },
      (error) => {
        setErrorMessage(error.data.reason);
      }
    );
  };

  const onSelectingEmiratesIdFront = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setEmiratesIdFrontImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadEmiratesIdFront((generatedViewModel) => {
        console.log('Upload result', generatedViewModel);
      }, file);
    } else {
      setEmiratesIdFrontImagePath(null);
    }
  };

  const onSelectingEmiratesIdBack = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setEmiratesIdBackImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadEmiratesIdBack((generatedViewModel) => {
        console.log('Upload result', generatedViewModel);
      }, file);
    } else {
      setEmiratesIdBackImagePath(null);
    }
  };

  const onSelectingPhoto = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setPhotoImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadPhoto((generatedViewModel) => {
        console.log('Upload result', generatedViewModel);
      }, file);
    } else {
      setPhotoImagePath(null);
    }
  };

  return (
    <>
      <Head>
        <title>Add Member</title>
      </Head>
      <HeaderComponent />
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Add Member</h1>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {errorMessage && <FormErrorComponent vm={errorMessage} />}
          <div className="space-y-8 divide-y divide-gray-200" ref={wrapper}>
            <div className="flex flex-nowrap ">
              <Transition
                appear={false}
                unmount={false}
                show={currentStep === 0}
                enter="transform transition ease-in-out duration-500"
                enterFrom={moving === 'right' ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
                enterTo={`translate-x-0 opacity-100`}
                leave="transform transition ease-in-out duration-500 "
                leaveFrom={`translate-x-0 opacity-100`}
                leaveTo={moving === 'right' ? `-translate-x-full opacity-0` : `translate-x-full opacity-0`}
                className="w-0 bg-green-200 overflow-visible"
                as="div"
              >
                <div style={{ width: `${wrapperWidth}px` }}>
                  <h2 className="text-xl font-bold leading-tight text-gray-900">
                    Membership Registration - Basic Details
                  </h2>
                </div>
              </Transition>

              <Transition
                appear={false}
                unmount={false}
                show={currentStep === 1}
                enter="transform transition ease-in-out duration-500"
                enterFrom={moving === 'right' ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
                enterTo={`translate-x-0 opacity-100`}
                leave="transform transition ease-in-out duration-500 "
                leaveFrom={`translate-x-0 opacity-100`}
                leaveTo={moving === 'right' ? `-translate-x-96 opacity-0` : `translate-x-96 opacity-0`}
                className="bg-red-200 w-0 overflow-visible"
                as="div"
              >
                <div style={{ width: `${wrapperWidth}px` }}>
                  <h2 className="text-xl font-bold leading-tight text-gray-900">
                    Membership Registration - Basic Details
                  </h2>
                </div>
              </Transition>

              <Transition
                appear={false}
                unmount={false}
                show={currentStep === 2}
                enter="transform transition ease-in-out duration-500"
                enterFrom={moving === 'right' ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
                enterTo={`translate-x-0 opacity-100`}
                leave="transform transition ease-in-out duration-500 "
                leaveFrom={`translate-x-0 opacity-100`}
                leaveTo={moving === 'right' ? `-translate-x-96 opacity-0` : `translate-x-96 opacity-0`}
                className="w-0 overflow-visible"
                as="div"
              >
                <div style={{ width: `${wrapperWidth}px` }}>
                  <h2 className="text-xl font-bold leading-tight text-gray-900">
                    Membership Registration - Home Country Details
                  </h2>
                </div>
              </Transition>

              <Transition
                appear={false}
                unmount={false}
                show={currentStep === 3}
                enter="transform transition ease-in-out duration-500"
                enterFrom={moving === 'right' ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
                enterTo={`translate-x-0 opacity-100`}
                leave="transform transition ease-in-out duration-500 "
                leaveFrom={`translate-x-0 opacity-100`}
                leaveTo={moving === 'right' ? `-translate-x-96 opacity-0` : `translate-x-96 opacity-0`}
                className="bg-blue-200 w-0 overflow-visible"
                as="div"
              >
                <div style={{ width: `${wrapperWidth}px` }}>
                  <h2 className="text-xl font-bold leading-tight text-gray-900">
                    Membership Registration - UAE Details
                  </h2>
                </div>
              </Transition>
            </div>
          </div>
          <div className={`mt-2`}>
            <p className="text-sm font-medium mb-1 mt-3 text-center">
              Step {steps.findIndex((step) => step.status === 'current') + 1} of {steps.length}
            </p>
            <nav className="flex items-center justify-center" aria-label="Progress">
              <button type="button" disabled={currentStep === 0} onClick={() => prevStep()}>
                Prev
              </button>
              <ol className="mx-8 flex items-center space-x-5">
                {steps.map((step, i) => (
                  <li key={`step_${i}`}>
                    {step.status === 'complete' ? (
                      <a href={step.href} className="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900">
                        <span className="sr-only"></span>
                      </a>
                    ) : step.status === 'current' ? (
                      <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
                        <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
                          <span className="w-full h-full rounded-full bg-indigo-200" />
                        </span>
                        <span className="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full" aria-hidden="true" />
                        <span className="sr-only"></span>
                      </a>
                    ) : (
                      <a href={step.href} className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">
                        <span className="sr-only"></span>
                      </a>
                    )}
                  </li>
                ))}
              </ol>
              <button type="button" disabled={currentStep === 3} onClick={() => nextStep()}>
                Next
              </button>
            </nav>
          </div>

          <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="emiratesIdFrontImagePath"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {' '}
                    Emirates ID Front <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      name="emiratesIdFrontImagePath"
                      id="emiratesIdFrontImagePath"
                      onChange={(e) => onSelectingEmiratesIdFront(e)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <ImagePreviewComponent vm={emiratesIdFrontImagePath} />
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="emiratesIdBackImagePath"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {' '}
                    Emirates ID Back <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      name="emiratesIdBackImagePath"
                      id="emiratesIdBackImagePath"
                      onChange={(e) => onSelectingEmiratesIdBack(e)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <ImagePreviewComponent vm={emiratesIdBackImagePath} />
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="emiratesIdNumber"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {' '}
                    Emirates ID Number
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="emiratesIdNumber"
                      id="emiratesIdNumber"
                      autoComplete="emirates-id"
                      value={emiratesIdNumber}
                      onChange={(e) => setEmiratesId(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="emiratesIdExpiry"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {' '}
                    Emirates ID Expiry
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="date"
                      name="emiratesIdExpiry"
                      id="emiratesIdExpiry"
                      autoComplete="emirates-id-expiry"
                      value={emiratesIdExpiry}
                      onChange={(e) => setEmiratesIdExpiry(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Date Of Birth
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      autoComplete="dateOfBirth"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Mobile Number
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      autoComplete="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Gender
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <label>
                      <input type="radio" value="0" name="gender" /> Male
                    </label>
                    <label className="m-14">
                      <input type="radio" value="1" name="gender" /> Female
                    </label>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="photoImagePath" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Photo <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      name="photoImagePath"
                      id="photoImagePath"
                      onChange={(e) => onSelectingPhoto(e)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <ImagePreviewComponent vm={photoImagePath} />
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="alternateMobile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Alternate Mobile
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="alternateMobile"
                      id="alternateMobile"
                      autoComplete="alternateMobile"
                      value={alternateMobile}
                      onChange={(e) => setAlternateMobile(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Email
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Passport Number
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="passportNumber"
                      id="passportNumber"
                      autoComplete="passportNumber"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="passportExpiry" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Passport Expiry
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="date"
                      name="passportExpiry"
                      id="passportExpiry"
                      autoComplete="passportExpiry"
                      value={passportExpiry}
                      onChange={(e) => setPassportExpiry(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Profession
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="profession"
                      name="profession"
                      autoComplete="profession"
                      value={profession}
                      onChange={(e) => {
                        setProfession(e.target.value);
                      }}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {professionsLookup &&
                        professionsLookup.length &&
                        professionsLookup.map((profession, index) => {
                          return (
                            <option key={index} value={profession.id}>
                              {profession.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Qualification
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="qualification"
                      name="qualification"
                      autoComplete="qualification"
                      value={qualification}
                      onChange={(e) => {
                        setQualification(e.target.value);
                      }}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {qualificationsLookup &&
                        qualificationsLookup.length &&
                        qualificationsLookup.map((qualification, index) => {
                          return (
                            <option key={index} value={qualification.id}>
                              {qualification.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Blood Group
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      autoComplete="bloodGroup"
                      value={bloodGroup}
                      onChange={(e) => {
                        setBloodGroup(e.target.value);
                      }}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="0">A +</option>
                      <option value="1">A -</option>
                      <option value="2">B +</option>
                      <option value="3">B -</option>
                      <option value="4">O +</option>
                      <option value="5">O -</option>
                      <option value="6">AB +</option>
                      <option value="7">AB -</option>
                      <option value="8">Unknown</option>
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    House Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="houseName"
                      id="houseName"
                      autoComplete="houseName"
                      value={houseName}
                      onChange={(e) => setHouseName(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="addressIndia" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Address India
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="addressIndia"
                      id="addressIndia"
                      autoComplete="addressIndia"
                      value={addressIndia}
                      onChange={(e) => setAddressIndia(e.target.value)}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Area
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="area"
                      name="area"
                      autoComplete="area"
                      value={area}
                      onChange={(e) => {
                        setArea(e.target.value);
                      }}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {userLookups &&
                        userLookups.areas &&
                        userLookups.areas.map((org, index) => {
                          return (
                            <option key={index} value={org.id}>
                              {org.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Panchayat
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="panchayat"
                      name="panchayat"
                      autoComplete="panchayat"
                      value={panchayat}
                      onChange={(e) => {
                        setPanchayat(e.target.value);
                      }}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {userLookups &&
                        userLookups.panchayats &&
                        userLookups.panchayats.map((org, index) => {
                          return (
                            <option key={index} value={org.id}>
                              {org.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Registered Organization
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="registeredOrganization"
                      name="registeredOrganization"
                      autoComplete="registeredOrganization"
                      value={registeredOrganization}
                      onChange={(e) => {
                        setRegisteredOrganization(e.target.value);
                      }}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {organizationsLookup &&
                        organizationsLookup.map((org, index) => {
                          return (
                            <option key={index} value={org.id}>
                              {org.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {' '}
                    Welfare Scheme
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                      id="welfareScheme"
                      name="welfareScheme"
                      autoComplete="welfareScheme"
                      value={welfareScheme}
                      onChange={(e) => {
                        setWelfareScheme(e.target.value);
                      }}
                      className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select</option>
                      {welfareSchemesLookup &&
                        welfareSchemesLookup.map((org, index) => {
                          return (
                            <option key={index} value={org.id}>
                              {org.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    Router.push('/home');
                  }}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
