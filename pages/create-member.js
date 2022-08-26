import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NumberFormat from 'react-number-format';
import { Transition } from '@headlessui/react';
import LookupsPresenter from '../shared/lookups/lookups.presenter';
import MemberPresenter from '../components/member/members.presenter';
import UserPresenter from '../components/user/user.presenter';
import HeaderComponent from '../components/common/header.component';
import UploadsPresenter from '../shared/uploads/uploads.presenter';
import FormErrorComponent from '../components/common/form-error.component';
import ImagePreviewComponent from '../components/common/image-preview.component';
import PhotoPreviewComponent from '../components/common/photo-preview.component';

import Spinner from '../components/common/spinner';
import {
  dateToServerSideFormat,
  getDateInRegionalFormat,
  isEmptyObject,
  getItemNameById,
  isValidDate,
  convertDateToISOFormat,
} from '../shared/utilities';

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
  const [mandalamForAgentLookups, setMandalamForAgentLookups] = useState({});
  const [panchayatForAgentLookups, setPanchayatForAgentLookups] = useState({});

  const [errorMessage, setErrorMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [emiratesIdNumber, setEmiratesId] = useState('');
  const [emiratesIdExpiry, setEmiratesIdExpiry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [profession, setProfession] = useState('');
  const [qualification, setQualification] = useState('');
  const [bloodGroup, setBloodGroup] = useState(8);
  const [houseName, setHouseName] = useState('');
  const [addressIndia, setAddressIndia] = useState('');
  const [addressInDistrict, setAddressInDistrict] = useState('');
  const [addressInMandalam, setAddressInMandalam] = useState('');
  const [addressInPanchayat, setAddressInPanchayat] = useState('');

  const [area, setArea] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [mandalam, setMandalam] = useState('');
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
  const [isDoBDisabled, setDobBDisabled] = useState(true);
  const [isDisableEmiratesIdUploads, setDisableEmiratesIdUploads] = useState(false);

  const [isUserInDubaiState, setIsUserInDubaiState] = useState(false);
  const [isMandalamAgent, setIsMandalamAgent] = useState(false);
  const [isDistrictAgent, setIsDistrictAgent] = useState(false);

  const [isDispute, setIsDispute] = useState(false);
  const [isManuallyEntered, setManualEntry] = useState(false);

  const memberPresenter = new MemberPresenter();
  const lookupsPresenter = new LookupsPresenter();
  const uploadPresenter = new UploadsPresenter();
  const userPresenter = new UserPresenter();

  const wrapper = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(1);

  const [memberId, setMemberId] = useState('');
  const [membershipId, setMembershipId] = useState('');

  const dummyFrontImagePath = '/images/idfront.jpg';
  const dummyBackImagePath = 'images/idback.jpg';

  useEffect(() => {
    async function load() {
      await userPresenter.getCurrentUser((generatedViewModel) => {
        const userRole = generatedViewModel.role;
        if (userRole === 'mandalam-agent') setIsMandalamAgent(true);
        if (userRole === 'district-agent') setIsDistrictAgent(true);
      });

      await lookupsPresenter.loadUserLookups(async (generatedViewModel) => {
        const { agentMandalamId, agentDistrictId } = generatedViewModel;
        copyUserLookupsToStateViewModel(generatedViewModel);
        if (generatedViewModel.stateName === 'DUBAI') {
          setIsUserInDubaiState(true);
        }
        setAddressInDistrict(agentDistrictId);

        await lookupsPresenter.loadMandalams(agentDistrictId, (mandalamsViewModel) => {
          copyMandalamLookupsToStateViewModel(mandalamsViewModel);
          setAddressInMandalam(agentMandalamId);
        });

        await lookupsPresenter.loadMandalamsForAgent(agentDistrictId, (vm) => {
          setMandalamForAgentLookups(vm);
          setMandalam(agentMandalamId);
        });

        await lookupsPresenter.loadPanchayaths(agentMandalamId, (panchayathsViewModel) => {
          copyPanchayatLookupsToStateViewModel(panchayathsViewModel);
        });

        await lookupsPresenter.loadPanchayathsForAgent(agentMandalamId, (vm) => {
          setPanchayatForAgentLookups(vm);
        });
      });

      await lookupsPresenter.loadProfessions((generatedViewModel) => {
        copyProfessionsToStateViewModel(generatedViewModel.professions);
      });

      await lookupsPresenter.loadQualifications((generatedViewModel) => {
        copyQualificationsToStateViewModel(generatedViewModel.qualifications);
      });

      await lookupsPresenter.loadRegisteredOrganizations((generatedViewModel) => {
        copyOrganizationsToStateViewModel(generatedViewModel);
      });

      await lookupsPresenter.loadWelfareSchemes((generatedViewModel) => {
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
      emiratesIdExpiry: isIDExpiryDisabled
        ? dateToServerSideFormat(emiratesIdExpiry)
        : convertDateToISOFormat(emiratesIdExpiry),
      emiratesIdFrontPage,
      emiratesIdLastPage,
      dateOfBirth: isDoBDisabled ? dateToServerSideFormat(dateOfBirth) : convertDateToISOFormat(dateOfBirth),
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
      mandalam,
      registeredOrganization,
      welfareScheme,
      cardNumber,
      manuallyEntered: isManuallyEntered,
    };

    await memberPresenter.createMember(
      memberForm,
      (success) => {
        e.target.reset();
        setMemberId(success.data.id);
        setMembershipId(success.data.membershipId);
        setErrorMessage('');
        setCurrentStep(5);
      },
      (error) => {
        setErrorMessage(error.data.reason);
      }
    );
  };

  const handleDownload = async (event) => {
    event.preventDefault();
    await memberPresenter.downloadReceipt(memberId, membershipId);
  };

  const onSelectingEmiratesIdFront = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      let filesize = (file.size / 1024 / 1024).toFixed(4);
      if (filesize > 2) {
        setErrorMessage('Please upload an image with size less than 2MB');
        setEmiratesIdFrontPage('');
        setEmiratesIdFrontImagePath(null);
        setIsLoading(false);
        return;
      }
      setEmiratesIdFrontImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadEmiratesIdFront((generatedViewModel) => {
        setEmiratesIdFrontPage(generatedViewModel.data);
        setErrorMessage('');
        setIsLoading(false);
      }, file);
    } else {
      setEmiratesIdFrontImagePath(null);
    }
  };

  const onSelectingEmiratesIdBack = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      let filesize = (file.size / 1024 / 1024).toFixed(4);
      if (filesize > 2) {
        setErrorMessage('Please upload an image with size less than 2MB');
        setEmiratesIdLastPage('');
        setEmiratesIdBackImagePath(null);
        setIsLoading(false);
        return;
      }
      setEmiratesIdBackImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadEmiratesIdBack((generatedViewModel) => {
        setEmiratesIdLastPage(generatedViewModel.data);
        setErrorMessage('');
        setIsLoading(false);
      }, file);
    } else {
      setEmiratesIdBackImagePath(null);
    }
  };

  const onSelectingPhoto = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      let filesize = (file.size / 1024 / 1024).toFixed(4);
      if (filesize > 2) {
        setErrorMessage('Please upload an image with size less than 2MB');
        setPhotoImagePath(null);
        setPhoto('');
        setIsLoading(false);
        return;
      }
      setPhotoImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadPhoto((generatedViewModel) => {
        setPhoto(generatedViewModel.data);
        setIsLoading(false);
      }, file);
    } else {
      setPhotoImagePath(null);
    }
  };

  const onSelectingPassportFrontPage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      let filesize = (file.size / 1024 / 1024).toFixed(4);
      if (filesize > 2) {
        setErrorMessage('Please upload an image with size less than 2MB');
        setPassportFrontImagePath(null);
        setIsLoading(false);
        return;
      }
      setPassportFrontImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadPassportFirstPage((generatedViewModel) => {
        setPassportFrontPage(generatedViewModel.data);
        setErrorMessage('');
        setIsLoading(false);
      }, file);
    } else {
      setPassportFrontImagePath(null);
    }
  };

  const onSelectingPassportBackPage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      let filesize = (file.size / 1024 / 1024).toFixed(4);
      if (filesize > 2) {
        setErrorMessage('Please upload an image with size less than 2MB');
        setPassportBackImagePath(null);
        setIsLoading(false);
        return;
      }
      setPassportBackImagePath(URL.createObjectURL(file));
      await uploadPresenter.uploadPassportLastPage((generatedViewModel) => {
        setPassportLastPage(generatedViewModel.data);
        setIsLoading(false);
        setErrorMessage('');
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
            setErrorMessage('');
            setIsLoading(false);

            /* If not valid */
            if (!ocrData.isValidate) {
              setErrorMessage(ocrData.errorMessage);
              return;
            }

            if (ocrData.isDispute) {
              setIsDispute(true);
              setCurrentStep(4);
            }

            if (ocrData.isDuplicate) {
              setCurrentStep(4);
            }

            /*  STATUS: No Data Available */
            if (ocrData.status === 2) {
              setErrorMessage('Could not read data from Emirates ID. Please provide a better image!');
              setIsLoading(false);
              return;
            }

            /*  STATUS: Verified */
            if (ocrData.isValidate && ocrData.status === 0) {
              setFullName(ocrData.name);
              setEmiratesId(ocrData.idNumber);
              setGender(ocrData.gender + '');
              setDateOfBirth(getDateInRegionalFormat(ocrData.dateOfBirth));
              setEmiratesIdExpiry(getDateInRegionalFormat(ocrData.expiryDate));
              setCardNumber(ocrData.cardNumber);
            }

            /*  STATUS: PartiallyVerified  */
            if (ocrData.isValidate && ocrData.status === 1) {
              setManualEntry(true);
              if (ocrData.name && ocrData.name.length > 0) {
                setFullName(ocrData.name);
              } else {
                setNameDisabled(false);
              }

              if (ocrData.idNumber && ocrData.idNumber.length === 18) {
                setEmiratesId(ocrData.idNumber);
              } else {
                setIDNumberDisabled(false);
              }

              if (ocrData.expiryDate) {
                let tempDate = getDateInRegionalFormat(ocrData.expiryDate);
                setEmiratesIdExpiry(tempDate);
              } else {
                setIDExpiryDisabled(false);
              }

              if (ocrData.dateOfBirth) {
                let tempDate = getDateInRegionalFormat(ocrData.dateOfBirth);
                setDateOfBirth(tempDate);
              } else {
                setDobBDisabled(false);
              }
            }

            setDisableEmiratesIdUploads(true);
          }
        },
        (error) => {
          setIsLoading(false);
          setErrorMessage('Could not process Emirates ID. Please check the uploaded files are correct!');
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
    if (isUserInDubaiState) return passportFrontPage && passportLastPage && bloodGroup;
    else return bloodGroup;
  };

  const isStepThreeValid = () => {
    return addressInDistrict && addressInMandalam && addressInPanchayat && houseName;
  };

  const handleCreateDispute = () => {
    Router.push({
      pathname: '/create-dispute',
      query: { id: emiratesIdNumber },
    });
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
                            disabled={isDisableEmiratesIdUploads}
                            onChange={(e) => onSelectingEmiratesIdFront(e)}
                            className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                          <span className="text-red-600 italic">Note: Upload image size should be less than 2MB</span>
                        </div>
                        {emiratesIdFrontImagePath && <ImagePreviewComponent vm={emiratesIdFrontImagePath} />}
                        {!emiratesIdFrontImagePath && <ImagePreviewComponent vm={dummyFrontImagePath} />}
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
                            disabled={isDisableEmiratesIdUploads}
                            onChange={(e) => onSelectingEmiratesIdBack(e)}
                            className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                          <span className="text-red-600 italic">Note: Upload image size should be less than 2MB</span>
                        </div>

                        {emiratesIdBackImagePath && <ImagePreviewComponent vm={emiratesIdBackImagePath} />}
                        {!emiratesIdBackImagePath && <ImagePreviewComponent vm={dummyBackImagePath} />}
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
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
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
                            onChange={(e) => setEmiratesId(e.target.value)}
                            value={emiratesIdNumber}
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
                          {isIDExpiryDisabled && (
                            <input
                              type="text"
                              name="emiratesIdExpiry"
                              id="emiratesIdExpiry"
                              autoComplete="emirates-id-expiry"
                              disabled={isIDExpiryDisabled}
                              value={emiratesIdExpiry}
                              className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          )}
                          {!isIDExpiryDisabled && (
                            <input
                              type="date"
                              name="emiratesIdExpiry"
                              id="emiratesIdExpiry"
                              autoComplete="emirates-id-expiry"
                              onChange={(e) => setEmiratesIdExpiry(e.target.value)}
                              value={emiratesIdExpiry}
                              className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          )}
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
                          {isDoBDisabled && (
                            <input
                              type="text"
                              name="dateOfBirth"
                              id="dateOfBirth"
                              autoComplete="dateOfBirth"
                              disabled={isDoBDisabled}
                              value={dateOfBirth}
                              className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          )}
                          {!isDoBDisabled && (
                            <input
                              type="date"
                              name="dateOfBirth"
                              id="dateOfBirth"
                              autoComplete="dateOfBirth"
                              disabled={isDoBDisabled}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                              value={dateOfBirth}
                              className="max-w-lg block w-full shadow-sm disabled:bg-gray-100 focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          )}
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5 pb-5">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Mobile Number <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <NumberFormat
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                            format="##########"
                            placeholder="05XXXXXXXX"
                            mask="_"
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
                                onChange={handleGenderChange}
                                value="0"
                                name="gender"
                                checked={gender === '0'}
                              />
                              <span className="ml-2">Male </span>
                            </label>
                            <label className="m-14">
                              <input
                                type="radio"
                                onChange={handleGenderChange}
                                value="1"
                                name="gender"
                                checked={gender === '1'}
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
                            onChange={(e) => setPassportNumber(e.target.value)}
                            value={passportNumber}
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
                            onChange={(e) => setPassportExpiry(e.target.value)}
                            value={passportExpiry}
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
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            onChange={(e) => {
                              setProfession(e.target.value);
                            }}
                            value={profession}
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
                            onChange={(e) => {
                              setQualification(e.target.value);
                            }}
                            value={qualification}
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
                          Blood Group <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="bloodGroup"
                            name="bloodGroup"
                            autoComplete="bloodGroup"
                            onChange={(e) => {
                              setBloodGroup(e.target.value);
                            }}
                            value={bloodGroup}
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
                          District <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="addressInDistrict"
                            name="addressInDistrict"
                            autoComplete="addressInDistrict"
                            onChange={async (e) => {
                              setAddressInDistrict(e.target.value);
                              setAddressInMandalam('');
                              setAddressInPanchayat('');
                              await lookupsPresenter.loadMandalams(e.target.value, (generatedViewModel) => {
                                copyMandalamLookupsToStateViewModel(generatedViewModel);
                              });
                            }}
                            value={addressInDistrict}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Select</option>
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
                          Mandalam <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="addressInMandalam"
                            name="addressInMandalam"
                            autoComplete="addressInMandalam"
                            onChange={async (e) => {
                              setAddressInMandalam(e.target.value);
                              await lookupsPresenter.loadPanchayaths(e.target.value, (generatedViewModel) => {
                                copyPanchayatLookupsToStateViewModel(generatedViewModel);
                              });
                            }}
                            value={addressInMandalam}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Select</option>
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
                          Panchayath / Municipality <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="addressInPanchayat"
                            name="addressInPanchayat"
                            autoComplete="addressInPanchayat"
                            onChange={(e) => {
                              setAddressInPanchayat(e.target.value);
                            }}
                            value={addressInPanchayat}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            {<option value="">Select</option>}
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
                            onChange={(e) => setHouseName(e.target.value)}
                            value={houseName}
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
                            onChange={(e) => setAddressIndia(e.target.value)}
                            value={addressIndia}
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
                            onChange={(e) => {
                              setRegisteredOrganization(e.target.value);
                            }}
                            value={registeredOrganization}
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
                            onChange={(e) => {
                              setWelfareScheme(e.target.value);
                            }}
                            value={welfareScheme}
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
                        <label htmlFor="mandalam" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Mandalam <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="mandalam"
                            name="mandalam"
                            autoComplete="mandalam"
                            disabled={!isDistrictAgent}
                            onChange={async (e) => {
                              setMandalam(e.target.value);
                              await lookupsPresenter.loadPanchayaths(e.target.value, (generatedViewModel) => {
                                setPanchayatForAgentLookups(generatedViewModel);
                              });
                            }}
                            value={mandalam}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Select</option>
                            {mandalamForAgentLookups &&
                              mandalamForAgentLookups.mandalams &&
                              mandalamForAgentLookups.mandalams.map((org, index) => {
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
                          Panchayath / Municipality <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="panchayat"
                            name="panchayat"
                            autoComplete="panchayat"
                            onChange={(e) => {
                              setPanchayat(e.target.value);
                            }}
                            value={panchayat}
                            className="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Select</option>
                            {panchayatForAgentLookups &&
                              panchayatForAgentLookups.panchayaths &&
                              panchayatForAgentLookups.panchayaths.map((org, index) => {
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
                          Area <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="area"
                            name="area"
                            autoComplete="area"
                            onChange={(e) => {
                              setArea(e.target.value);
                            }}
                            value={area}
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
                            onChange={(e) => {
                              setAgreeTermsOne(e.target.value);
                            }}
                            value={agreeTermsOne}
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
                            onChange={(e) => {
                              setAgreeTermsTwo(e.target.value);
                            }}
                            value={agreeTermsTwo}
                            className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="agreeTermsTwo" className="ml-2 text-sm font-medium text-gray-900">
                            I agree and confirm above declaration
                          </label>
                        </div>
                      </div>
                    </div>
                  </Transition>

                  {/* <!-- Step 5 (Dispute Step) --> */}
                  <Transition
                    appear={false}
                    unmount={false}
                    show={currentStep === 4}
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
                      <div className="h-full mt-10 text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                          Member already exist in the system!
                        </h2>
                        <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-700">
                          Please review the details. We found the member already in the system.
                          {isDispute && <>You can create a dispute or restart the member creation process.</>}
                        </p>
                      </div>
                      <div className="mt-9 text-center">
                        {isDispute && (
                          <button
                            type="button"
                            onClick={handleCreateDispute}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 disabled:bg-gray-500 disabled:text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Create Dispute
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => Router.reload(window.location.pathname)}
                          className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Add Member
                        </button>
                      </div>
                    </div>
                  </Transition>

                  {/* <!-- Step 6 (Member Added Step) --> */}
                  <Transition
                    appear={false}
                    unmount={false}
                    show={currentStep === 5}
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
                      <div className="h-full mt-10 text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                          Member added to the system!
                        </h2>
                        <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-700">You can now download the receipt</p>
                      </div>
                      <div className="mt-9 text-center">
                        <button
                          type="button"
                          onClick={() => Router.push('/home')}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 disabled:bg-gray-500 disabled:text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Member List
                        </button>

                        <button
                          type="button"
                          onClick={handleDownload}
                          className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Print Receipt
                        </button>

                        <button
                          type="button"
                          onClick={() => Router.reload(window.location.pathname)}
                          className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 disabled:bg-gray-500 disabled:text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Add Member
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
            {currentStep !== 4 && currentStep !== 5 && (
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
                    {currentStep === 3 && (
                      <button
                        type="submit"
                        disabled={!agreeTermsOne || !agreeTermsTwo || !mandalam || !panchayat || !area}
                        className="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white disabled:bg-gray-500 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>
        </main>
      </div>
    </>
  );
}
