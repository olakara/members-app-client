import Observable from "../../shared/observable";
import httpGateway from "../../shared/http-gateway";

class DisputeRepository {

    disputesProgrammersModel = null;
    disputeProgrammersModel = null;

    constructor() {
        this.disputesProgrammersModel = new Observable([]);
        this.disputeProgrammersModel = new Observable({});
    }



}

const disputeRepository = new DisputeRepository();
export default disputeRepository;
