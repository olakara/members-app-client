import { config } from '../../shared/constants';
import httpGateway from "../../shared/http-gateway";
import Observable from "../../shared/observable";

class MembersRepostory {

    programmersModel = null;

    constructor() {
        this.programmersModel = new Observable([]);
    }

    getMembers = async callback => {

    }

    createMember = async(memberPm, successCallback, errorCallback) => {

    }

    loadData = async () => {

    }

}

const membersRepostory = new MembersRepostory();
export default membersRepostory;