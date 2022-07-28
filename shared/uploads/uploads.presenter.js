import uploadsRepository from './uploads.repository';

export default class UploadsPresenter {
  uploadPhoto = async (callback, file) => {
    uploadsRepository.uploadPhoto((resultPm) => {
      callback(resultPm);
    }, file);
  };

  uploadEmiratesIdFront = async (callback, file) => {
    uploadsRepository.uploadEmiratesIdFront((resultPm) => {
      callback(resultPm);
    }, file);
  };

  uploadEmiratesIdBack = async (callback, file) => {
    uploadsRepository.uploadEmiratesIdBack((resultPm) => {
      callback(resultPm);
    }, file);
  };

  uploadPassportFirstPage = async (callback, file) => {
    uploadsRepository.uploadPassportFirstPage((resultPm) => {
      callback(resultPm);
    }, file);
  };

  uploadPassportVisaPage = async (callback, file) => {
    uploadsRepository.uploadPassportVisaPage((resultPm) => {
      callback(resultPm);
    }, file);
  };

  uploadPassportLastPage = async (callback, file) => {
    uploadsRepository.uploadPassportLastPage((resultPm) => {
      callback(resultPm);
    }, file);
  };
}
