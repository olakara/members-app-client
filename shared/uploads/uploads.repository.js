import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class UploadsRepository {
  emiratesIdFrontPageProgrammersModel = null;
  emiratesIdBackPageProgrammersModel = null;
  photoProgrammersModel = null;
  passportFirstProgrammersModel = null;
  passportLastProgrammersModel = null;
  passportVisaProgrammersModel = null;

  constructor() {
    this.emiratesIdFrontPageProgrammersModel = new Observable({});
    this.emiratesIdBackPageProgrammersModel = new Observable({});
    this.photoProgrammersModel = new Observable({});
    this.passportFirstProgrammersModel = new Observable({});
    this.passportLastProgrammersModel = new Observable({});
    this.passportVisaProgrammersModel = new Observable({});
  }

  uploadPhoto = async (callback, fileDto) => {
    this.photoProgrammersModel.subscribe(callback);
    await this.photoApi(fileDto);
    this.photoProgrammersModel.notify();
  };

  uploadEmiratesIdFront = async (callback, fileDto) => {
    this.emiratesIdFrontPageProgrammersModel.subscribe(callback);
    await this.idFrontApi(fileDto);
    this.emiratesIdFrontPageProgrammersModel.notify();
  };

  uploadEmiratesIdBack = async (callback, fileDto) => {
    this.emiratesIdBackPageProgrammersModel.subscribe(callback);
    await this.idBackApi(fileDto);
    this.emiratesIdBackPageProgrammersModel.notify();
  };

  uploadPassportFirstPage = async (callback, fileDto) => {
    this.passportFirstProgrammersModel.subscribe(callback);
    await this.passportFirstApi(fileDto);
    this.passportFirstProgrammersModel.notify();
  };

  uploadPassportVisaPage = async (callback, fileDto) => {
    this.passportVisaProgrammersModel.subscribe(callback);
    await this.passportVisaApi(fileDto);
    this.passortVisaProgrammersModel.notify();
  };

  uploadPassportLastPage = async (callback, fileDto) => {
    this.passportLastProgrammersModel.subscribe(callback);
    await this.passportLastApi(fileDto);
    this.passportLastProgrammersModel.notify();
  };

  photoApi = async (fileDto) => {
    const resultDto = await httpGateway.upload(config.BASE_URL + 'fileupload/photo', fileDto);
    this.photoProgrammersModel.value = resultDto;
  };

  idFrontApi = async (fileDto) => {
    const resultDto = await httpGateway.upload(config.BASE_URL + 'fileupload/emirates-id-front', fileDto);
    this.emiratesIdFrontPageProgrammersModel.value = resultDto;
  };

  idBackApi = async (fileDto) => {
    const resultDto = await httpGateway.upload(config.BASE_URL + 'fileupload/emirates-id-back', fileDto);
    this.emiratesIdBackPageProgrammersModel.value = resultDto;
  };

  passportFirstApi = async (fileDto) => {
    const resultDto = await httpGateway.upload(config.BASE_URL + 'fileupload/passport-first', fileDto);
    this.passportFirstProgrammersModel.value = resultDto;
  };

  passportVisaApi = async (fileDto) => {
    const resultDto = await httpGateway.upload(config.BASE_URL + 'fileupload/passport-first', fileDto);
    this.passportFirstProgrammersModel.value = resultDto;
  };

  passportLastApi = async (fileDto) => {
    const resultDto = await httpGateway.upload(config.BASE_URL + 'fileupload/passport-last', fileDto);
    this.passportLastProgrammersModel.value = resultDto;
  };
}

const uploadsRepository = new UploadsRepository();
export default uploadsRepository;
