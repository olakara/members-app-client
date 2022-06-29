import userRepository from './user.repository'

export default class UserPresenter {

    signIn = async (email, password) => {
        return await userRepository.signIn({email, password});
    }

    signOut = () => {
       return userRepository.signOut();
    }

    isLoggedIn =  () => {
        return userRepository.isLoggedIn();
    }

    getCurrentUser = async (callback) => {
        const isLoggedIn = await userRepository.isLoggedIn();
        if(isLoggedIn) {
            await userRepository.getCurrentUser(userPm => {
                const userVm = { ...userPm, isLoggedIn };
                callback(userVm);
            });
        } else {
            callback(null);
        }
    }
}