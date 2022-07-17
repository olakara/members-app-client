import { config } from '../../shared/constants';
import httpGateway from '../../shared/http-gateway';
import Observable from '../../shared/observable';

class UploadsRepository {
  emiratesIdFrontPageProgrammersModel = null;

  constructor() {
    this.emiratesIdFrontPageProgrammersModel = new Observable({});
  }

  uploadEmiratesIdFront = async (callback, fileDto) => {
    this.emiratesIdFrontPageProgrammersModel.subscribe(callback);
    await this.uploadIdFront(fileDto);
    this.emiratesIdFrontPageProgrammersModel.notify();
  };

  uploadIdFront = async (fileDto) => {
    const resultDto = await httpGateway.upload(config.BASE_URL + 'fileupload/emirates-id-front', fileDto);
    this.emiratesIdFrontPageProgrammersModel.value = resultDto;
  };
}

const uploadsRepository = new UploadsRepository();
export default uploadsRepository;
