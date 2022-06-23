import httpGateway from "../../shared/http-gateway";
import Observable from "../../shared/observable";

class UserRepository {
    userPm = null;
    
    constructor() {
        this.userPm = new Observable({});
    }

    getUser = async (callback) => {
        this.userPm.subscribe(callback);
        const userDto = await httpGateway.get("http://localhost:5000/Users/me");
        this.userPm.value = userDto;
        this.userPm.notify();
    }

    signIn = async (signInDto) => {

        const accessDto = await httpGateway.post("http://localhost:5000/Users/sign-in",signInDto);
        if(accessDto.accessToken) {
            localStorage.setItem("token", accessDto.accessToken);
            return true;
        } else {
            return false;
        }
    }

    signOut = async () => {
        localStorage.clear();
    }

    isLoggedIn = async () => {
        const token = localStorage.getItem("token");
        if(token) {
            return true;
        } else 
            return false;
    }

}

const userRepository = new UserRepository();
export default userRepository;