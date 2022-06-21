import userRepository from './user.repository'

export default class UserPresenter {

    signIn = async (email, password) => {
        return await userRepository.signIn({email, password});
    }

    signOut = () => {
       return userRepository.signOut();
    }

    isLoggedIn =  async () => {
        return await userRepository.isLoggedIn();
    }

    getUser = async (callback) => {
        const isLoggedIn = await userRepository.isLoggedIn();       
        if(isLoggedIn) {
            await userRepository.getUser(userPm => {
                console.log('userPm in UserPresenter...', userPm);
                const userVm = { ...userPm, isLoggedIn };
                callback(userVm);
            });
        } else {
            callback(null);
        }
    }
}