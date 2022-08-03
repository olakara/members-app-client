import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Transition } from '@headlessui/react';
import LookupsPresenter from '../shared/lookups/lookups.presenter';
import MemberPresenter from '../components/member/members.presenter';
import HeaderComponent from '../components/common/header.component';
import UploadsPresenter from '../shared/uploads/uploads.presenter';
import FormErrorComponent from '../components/common/form-error.component';
import ImagePreviewComponent from '../components/common/image-preview.component';
import PhotoPreviewComponent from '../components/common/photo-preview.component';

import Spinner from '../components/common/spinner';
import { getDateInRegionalFormat, isEmptyObject, getItemNameById } from '../shared/utilities';

export default function CreateMemberPage() {
  const [isLoading, setIsLoading] = useState(false);
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

  const [userLookups, copyUserLookupsToStateViewModel] = useState({});
  const [professionsLookup, copyProfessionsToStateViewModel] = useState([]);
  const [qualificationsLookup, copyQualificationsToStateViewModel] = useState([]);
  const [organizationsLookup, copyOrganizationsToStateViewModel] = useState([]);
  const [welfareSchemesLookup, copyWelfareSchemesToStateViewModel] = useState([]);
  const [mandalamLookups, copyMandalamLookupsToStateViewModel] = useState({});
  const [panchayatLookups, copyPanchayatLookupsToStateViewModel] = useState({});

  const [errorMessage, setErrorMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [emiratesIdNumber, setEmiratesId] = useState('');
  const [emiratesIdExpiry, setEmiratesIdExpiry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [profession, setProfession] = useState('');
  const [qualification, setQualification] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [houseName, setHouseName] = useState('');
  const [addressIndia, setAddressIndia] = useState('');
  const [addressInDistrict, setAddressInDistrict] = useState('');
  const [addressInMandalam, setAddressInMandalam] = useState('');
  const [addressInPanchayat, setAddressInPanchayat] = useState('');

  const [area, setArea] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [registeredOrganization, setRegisteredOrganization] = useState('');
  const [welfareScheme, setWelfareScheme] = useState('');
  const [agreeTermsOne, setAgreeTermsOne] = useState(false);
  const [agreeTermsTwo, setAgreeTermsTwo] = useState(false);

  const [gender, setGender] = useState('0');

  const [emiratesIdFrontPage, setEmiratesIdFrontPage] = useState('');
  const [emiratesIdLastPage, setEmiratesIdLastPage] = useState('');
  const [passportFrontPage, setPassportFrontPage] = useState('');
  const [passportLastPage, setPassportLastPage] = useState('');
  const [photo, setPhoto] = useState('');

  const [emiratesIdFrontImagePath, setEmiratesIdFrontImagePath] = useState('');
  const [emiratesIdBackImagePath, setEmiratesIdBackImagePath] = useState('');
  const [photoImagePath, setPhotoImagePath] = useState('');
  const [passportFrontImagePath, setPassportFrontImagePath] = useState('');
  const [passportBackImagePath, setPassportBackImagePath] = useState('');

  const [isNameDisabled, setNameDisabled] = useState(true);
  const [isIDNumberDisabled, setIDNumberDisabled] = useState(true);
  const [isIDExpiryDisabled, setIDExpiryDisabled] = useState(true);
  const [isDoBDisabled, setDobBisabled] = useState(true);

  const [isUserInDubaiState, setIsUserInDubaiState] = useState(false);

  const memberPresenter = new MemberPresenter();
  const lookupsPresenter = new LookupsPresenter();
  const uploadPresenter = new UploadsPresenter();

  const wrapper = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(1);

  useEffect(() => {
    async function load() {
      await lookupsPresenter.loadUserLookups(async (generatedViewModel) => {
        console.log('User lookups', generatedViewModel);
        copyUserLookupsToStateViewModel(generatedViewModel);
        if (generatedViewModel.stateName === 'DUBAI') {
          setIsUserInDubaiState(true);
        }
        setAddressInDistrict(generatedViewModel.agentDistrictId);

        await lookupsPresenter.loadMandalams(generatedViewModel.agentDistrictId, (mandalamsViewModel) => {
          console.log('Mandalams', mandalamsViewModel);
          copyMandalamLookupsToStateViewModel(mandalamsViewModel);
          setAddressInMandalam(generatedViewModel.agentMandalamId);
        });

        await lookupsPresenter.loadPanchayaths(generatedViewModel.agentMandalamId, (panchayathsViewModel) => {
          console.log('Panchayaths', panchayathsViewModel);
          copyPanchayatLookupsToStateViewModel(panchayathsViewModel);
        });
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
      emiratesIdFrontPage,
      emiratesIdLastPage,
      dateOfBirth,
      mobile,
      email,
      passportNumber,
      passportExpiry,
      passportFrontPage,
      passportLastPage,
      profession,
      qualification,
      bloodGroup,
      gender,
      photo,
      houseName,
      addressIndia,
      addressInDistrict,
      addressInMandalam,
      addressInPanchayat,
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
        setEmiratesIdFrontPage(generatedViewModel.data);
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
        setEmiratesIdLastPage(generatedViewModel.data);
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
        setPhoto(generatedViewModel.data);
      }, file);
    } else {
      setPhotoImagePath(null);
    }
  };

  const onSelectingPassportFrontPage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setPassportFrontImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadPassportFirstPage((generatedViewModel) => {
        console.log('Upload result', generatedViewModel);
        setPassportFrontPage(generatedViewModel.data);
      }, file);
    } else {
      setPassportFrontImagePath(null);
    }
  };

  const onSelectingPassportBackPage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setPassportBackImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadPassportLastPage((generatedViewModel) => {
        console.log('Upload result', generatedViewModel);
        setPassportLastPage(generatedViewModel.data);
      }, file);
    } else {
      setPassportBackImagePath(null);
    }
  };

  const processEmiratesID = async (event) => {
    event.preventDefault();
    if (emiratesIdFrontPage && emiratesIdLastPage) {
      setIsLoading(true);
      const emiratesIdData = {
        frontPageId: emiratesIdFrontPage,
        lastPageId: emiratesIdLastPage,
      };

      await memberPresenter.getOcrData(
        emiratesIdData,
        (ocrData) => {
          if (ocrData && !isEmptyObject(ocrData)) {
            if (ocrData.isDispute) {
              Router.push({
                pathname: '/create-dispute',
                query: {
                  id: ocrData.idNumber,
                },
              });
            }

            setFullName(ocrData.name);
            setEmiratesId(ocrData.idNumber);
            setGender(ocrData.gender + '');
            setDateOfBirth(getDateInRegionalFormat(ocrData.dateofBirth));
            setEmiratesIdExpiry(getDateInRegionalFormat(ocrData.expiryDate));

            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const isStepOneValid = () => {
    return (
      fullName &&
      emiratesIdNumber &&
      emiratesIdExpiry &&
      emiratesIdFrontPage &&
      emiratesIdLastPage &&
      dateOfBirth &&
      gender &&
      mobile &&
      mobile.length === 10
    );
  };

  const isStepTwoValid = () => {
    if (isUserInDubaiState) return passportFrontPage && passportLastPage;
    else return true;
  };

  const isStepThreeValid = () => {
    return houseName;
  };

  return (
    <>
      <Head>
        <title>Add Member</title>
      </Head>
      <HeaderComponent />
      {isLoading && <Spinner isMessageNeeded={true} />}
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
          <form className="space-y-8 divide-y divide-gray-200" ref={wrapper} onSubmit={handleSubmit}>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div className="flex flex-nowrap ">
                  {/* <!-- Step 1 --> */}
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
                    className="w-0 overflow-visible"
                    as="div"
                  >
                    <div style={{ width: `${wrapperWidth}px` }}>
                      <h2 className="text-xl font-bold leading-tight text-gray-900 pb-5">
                        Membership Registration - Basic Details
                      </h2>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="emiratesIdFrontImagePath"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Emirates ID Front <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="file"
                            accept="image/*"
                            name="emiratesIdFrontImagePath"
                            id="emiratesIdFrontImagePath"
                            disabled={emiratesIdFrontImagePath}
                            onChange={(e) => onSelectingEmiratesIdFront(e)}
                            className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <ImagePreviewComponent vm={emiratesIdFrontImagePath} />
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="emiratesIdBackImagePath"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Emirates ID Back <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="file"
                            accept="image/*"
                            name="emiratesIdBackImagePath"
                            id="emiratesIdBackImagePath"
                            disabled={emiratesIdBackImagePath}
                            onChange={(e) => onSelectingEmiratesIdBack(e)}
                            className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <ImagePreviewComponent vm={emiratesIdBackImagePath} />
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start pt-1 pb-5">
                        <div className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"></div>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <button
                            onClick={processEmiratesID}
                            disabled={!(emiratesIdFrontPage && emiratesIdLastPage)}
                            className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Upload and Process ID Card
                          </button>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            autoComplete="given-name"
                            disabled={isNameDisabled}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="emiratesIdNumber"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Emirates ID Number <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="emiratesIdNumber"
                            id="emiratesIdNumber"
                            autoComplete="emirates-id"
                            disabled={isIDNumberDisabled}
                            value={emiratesIdNumber}
                            onChange={(e) => setEmiratesId(e.target.value)}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="emiratesIdExpiry"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Emirates ID Expiry <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="emiratesIdExpiry"
                            id="emiratesIdExpiry"
                            autoComplete="emirates-id-expiry"
                            disabled={isIDExpiryDisabled}
                            value={emiratesIdExpiry}
                            onChange={(e) => setEmiratesIdExpiry(e.target.value)}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="dateOfBirth"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Date Of Birth <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            autoComplete="dateOfBirth"
                            disabled={isDoBDisabled}
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Mobile Number <span className="text-red-600">*</span>
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
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Gender <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <fieldset>
                            <label>
                              <input
                                type="radio"
                                value="0"
                                name="gender"
                                checked={gender === '0'}
                                onChange={handleGenderChange}
                              />
                              <span className="ml-2">Male </span>
                            </label>
                            <label className="m-14">
                              <input
                                type="radio"
                                value="1"
                                name="gender"
                                checked={gender === '1'}
                                onChange={handleGenderChange}
                              />
                              <span className="ml-2">Female </span>
                            </label>
                          </fieldset>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="photoImagePath"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Photo
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
                        <PhotoPreviewComponent vm={photoImagePath} />
                      </div>
                    </div>
                  </Transition>

                  {/* <!-- Step 2 --> */}
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
                    className="w-0 overflow-visible"
                    as="div"
                  >
                    <div style={{ width: `${wrapperWidth}px` }}>
                      <h2 className="text-xl font-bold leading-tight text-gray-900 pb-5">
                        Membership Registration - Basic Details
                      </h2>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="passportFrontImagePath"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Passport First Page {isUserInDubaiState && <span className="text-red-600">*</span>}
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="file"
                            accept="application/pdf,image/*"
                            name="passportFrontImagePath"
                            id="passportFrontImagePath"
                            onChange={(e) => onSelectingPassportFrontPage(e)}
                            className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        {/* <ImagePreviewComponent vm={passportFrontImagePath} /> */}
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="passportBackImagePath"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Passport Last Page {isUserInDubaiState && <span className="text-red-600">*</span>}
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="file"
                            accept="application/pdf,image/*"
                            name="passportBackImagePath"
                            id="passportBackImagePath"
                            onChange={(e) => onSelectingPassportBackPage(e)}
                            className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        {/* <ImagePreviewComponent vm={passportBackImagePath} /> */}
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="passportNumber"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
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

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="passportExpiry"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
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

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
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

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="profession"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
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
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="qualification"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
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
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="bloodGroup"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
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
                    </div>
                  </Transition>

                  {/* <!-- Step 3 --> */}
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
                      <h2 className="text-xl font-bold leading-tight text-gray-900 pb-5">
                        Membership Registration - Home Country Details
                      </h2>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          State
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            disabled
                            value="KERALA"
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          District
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="addressInDistrict"
                            name="addressInDistrict"
                            autoComplete="addressInDistrict"
                            value={addressInDistrict}
                            onChange={async (e) => {
                              setAddressInDistrict(e.target.value);
                              setAddressInMandalam('');
                              setAddressInPanchayat('');
                              await lookupsPresenter.loadMandalams(e.target.value, (generatedViewModel) => {
                                console.log('Mandalams', generatedViewModel);
                                copyMandalamLookupsToStateViewModel(generatedViewModel);
                              });
                            }}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            {/* <option value="">Select</option> */}
                            {userLookups &&
                              userLookups.district &&
                              userLookups.district.map((org, index) => {
                                return (
                                  <option key={index} value={org.id}>
                                    {org.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Mandalam
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="addressInMandalam"
                            name="addressInMandalam"
                            autoComplete="addressInMandalam"
                            value={addressInMandalam}
                            onChange={async (e) => {
                              setAddressInMandalam(e.target.value);
                              await lookupsPresenter.loadPanchayaths(e.target.value, (generatedViewModel) => {
                                console.log('Panchayaths', generatedViewModel);
                                copyPanchayatLookupsToStateViewModel(generatedViewModel);
                              });
                            }}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            {/* <option value="">Select</option> */}
                            {mandalamLookups &&
                              mandalamLookups.mandalams &&
                              mandalamLookups.mandalams.map((org, index) => {
                                return (
                                  <option key={index} value={org.id}>
                                    {org.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Panchayat <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="addressInPanchayat"
                            name="addressInPanchayat"
                            autoComplete="addressInPanchayat"
                            value={addressInPanchayat}
                            onChange={(e) => {
                              setAddressInPanchayat(e.target.value);
                            }}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            {/* <option value="">Select</option> */}
                            {panchayatLookups &&
                              panchayatLookups.panchayaths &&
                              panchayatLookups.panchayaths.map((org, index) => {
                                return (
                                  <option key={index} value={org.id}>
                                    {org.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          House Name <span className="text-red-600">*</span>
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
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label
                          htmlFor="addressIndia"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
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
                    </div>
                  </Transition>

                  {/* <!-- Step 4 --> */}
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
                    className="w-0 overflow-visible"
                    as="div"
                  >
                    <div style={{ width: `${wrapperWidth}px` }}>
                      <h2 className="text-xl font-bold leading-tight text-gray-900 pb-5">
                        Membership Registration - UAE Details
                      </h2>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
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
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
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

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          State
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            disabled
                            value={userLookups && userLookups.stateName}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          District
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            disabled
                            value={userLookups && userLookups.districtsName}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Mandalam
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            disabled
                            value={userLookups && userLookups.cascadeTitle}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="houseName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Panchayath
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            disabled
                            value={userLookups && getItemNameById(userLookups.panchayats, panchayat)}
                            className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Area <span className="text-red-600">*</span>
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

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="terms" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Declaration
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-500 dark:focus:border-green-500">
                            <p className="pb-5">
                              മെമ്പര്‍ഷിപ്പ് ചേര്‍ക്കുന്നതിനുള്ള യു.എ.ഇ കെ.എം.സി.സി യുടെ അംഗീകൃത ഏജന്റ് എന്ന നിലയില്‍
                              മുകളില്‍ കൊടുത്തിരിക്കുന്ന മുഴുവൻ വിവരങ്ങളും പരിപൂർണ്ണമായും സത്യസന്ധമായ കാര്യങ്ങളാണെന്ന്
                              ഞാൻ ഉറപ്പ് നൽകുന്നു.
                            </p>
                            <p className="pb-5">
                              ഞാന്‍ ചേര്‍ക്കുന്ന ഈ വ്യക്തി, കേരളീയനാണെന്നും എന്റെ ജില്ലക്കാരനാണെന്നും ഇന്ത്യന്‍ യൂണിയന്‍
                              മുസ്ലിം ലീഗിന്റെയും യു.എ.ഇ കെ എം സി സി യുടെയും നയപരിപാടികളും ആദര്‍ശലക്ഷ്യങ്ങളും
                              നിലപാടുകളും അനുസരിച്ച് പ്രവര്‍ത്തിക്കുന്ന വ്യക്തിയാണെന്നും ഞാന്‍ ഉറപ്പ് നല്‍കുന്നു.
                            </p>
                            <p className="pb-5">
                              യു.എ.ഇ കെ എം സി സി യുടെ നിയമാവലിക്ക് വിരുദ്ധമായ രീതിയില്‍ ആളുകളെ ചേര്‍ത്താല്‍ , യു.എ.ഇ -
                              കെ എം സി സി നല്‍കുന്ന ഏത് അച്ചടക്ക നടപടിയും സ്വീകരിക്കുകയും അനുസരിക്കുകയും ചെയ്യുമെന്ന്
                              ഇതിനാൽ ഞാന്‍ ഉറപ്പ് നല്‍കുന്നു.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"></label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            id="agreeTermsOne"
                            name="agreeTermsOne"
                            type="radio"
                            value={agreeTermsOne}
                            onChange={(e) => {
                              setAgreeTermsOne(e.target.value);
                            }}
                            className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="agreeTermsOne" className="ml-2 text-sm font-medium text-gray-900">
                            മെമ്പര്‍ഷിപ്പ് ഫീസ് പത്ത് ദിര്‍ഹം കിട്ടി ബോധിച്ചു
                          </label>
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"></label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <input
                            id="agreeTermsTwo"
                            name="agreeTermsTwo"
                            type="radio"
                            value={agreeTermsTwo}
                            onChange={(e) => {
                              setAgreeTermsTwo(e.target.value);
                            }}
                            className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="agreeTermsTwo" className="ml-2 text-sm font-medium text-gray-900">
                            I agree and confirm above declaration
                          </label>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-between">
                <div>
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={() => prevStep()}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 disabled:bg-gray-500 disabled:text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Prev
                  </button>
                </div>

                <div className="flex-auto">
                  <p className="text-sm font-medium mb-1 mt-3 text-center">
                    Step {steps.findIndex((step) => step.status === 'current') + 1} of {steps.length}
                  </p>
                </div>
                <div>
                  {currentStep !== 3 && (
                    <button
                      type="button"
                      disabled={
                        (currentStep === 0 && !isStepOneValid()) ||
                        (currentStep === 1 && !isStepTwoValid()) ||
                        (currentStep === 2 && !isStepThreeValid())
                      }
                      onClick={() => nextStep()}
                      className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Next
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!agreeTermsOne || !agreeTermsTwo}
                    className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
