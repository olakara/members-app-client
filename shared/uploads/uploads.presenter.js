import uploadsRepository from './uploads.repository';

export default class UploadsPresenter {
  uploadEmiratesIdFront = async (callback, file) => {
    uploadsRepository.uploadEmiratesIdFront((resultPm) => {
      callback(resultPm);
    }, file);
  };
}
