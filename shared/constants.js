import { getURL } from "next/dist/shared/lib/utils";

const prod = {
   BASE_URL: 'http://membership-app.me/',
   USER_INFO: 'users/me',
   SIGN_IN: 'users/sign-in'
};

const dev = {
   BASE_URL: 'http://localhost:5000/',
   USER_INFO: 'users/me',
   SIGN_IN: 'users/sign-in'
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
