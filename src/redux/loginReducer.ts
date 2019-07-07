import {me, setIsAuth} from "./authReducer";
import {serverAPI} from '../dal/axios-instance';

const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
const SET_LOGIN_RESULT = 'SET_LOGIN_RESULT';
const SET_LOGIN_STATUS_MESSAGE = 'SET_LOGIN_STATUS_MESSAGE';

export const loginStatuses = {
    NOT_INITIALIZED: 'NOT_INITIALIZED',
    ERROR: 'ERROR',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS'
};

let initialState = {
    loginStatus: loginStatuses.NOT_INITIALIZED,
    email: '',
    password: '',
    rememberMe: false,
    captcha: '',
    captchaUrl: '',
    loginStatusMessage: '',
    loginResult: null,
};

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CAPTCHA_URL : {
            return {
                ...state, captchaUrl: action.captchaUrl
            }
        }
        case SET_LOGIN_STATUS : {
            return {
                ...state, loginStatus: action.loginStatus
            }
        }
        case SET_LOGIN_RESULT : {
            return {
                ...state, loginResult: action.loginResult
            }
        }
        case SET_LOGIN_STATUS_MESSAGE : {
            return {
                ...state, loginStatusMessage: action.loginStatusMessage
            }
        }
        default: {
            return state;
        }
    }
};

export const setCaptchaUrl = (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl});
export const setLoginStatus = (loginStatus: any) => ({type: SET_LOGIN_STATUS, loginStatus});
export const setLoginResult = (loginResult: any) => ({type: SET_LOGIN_RESULT, loginResult});
export const setLoginStatusMessage = (loginStatusMessage: string) => ({type: SET_LOGIN_STATUS_MESSAGE, loginStatusMessage});


export const loginAttempt = (values: any) => (dispatch: Function) => {
    dispatch(setLoginStatus(loginStatuses.IN_PROGRESS));
    serverAPI.loginRequest(values.email, values.password, values.rememberMe, values.captcha)
        .then(res => {
            dispatch(setLoginResult(res.data.resultCode));
            switch (res.data.resultCode) {
                case 0:
                    dispatch(setLoginStatusMessage('Login success'));
                    dispatch(setLoginStatus(loginStatuses.SUCCESS));
                    dispatch(me());
                    break;
                case 1:
                    dispatch(setLoginStatus(loginStatuses.ERROR));
                    dispatch(setLoginStatusMessage(res.data.messages[0]));
                    break;
                case 10:
                    dispatch(setLoginStatus(loginStatuses.ERROR));
                    dispatch(setLoginStatusMessage(res.data.messages[0]));
                    serverAPI.captchaRequest().then((res) => {
                        dispatch(setCaptchaUrl(res.data.url));
                    });
                    break;
                default:
                    break;
            }
        })
};

export const logOutAttempt = () => (dispatch: Function) => {
    serverAPI.logoutRequest()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuth(false, {id: null, login: null, email: null,}));
                dispatch(setLoginStatus(loginStatuses.NOT_INITIALIZED));
                dispatch(setLoginStatusMessage('Logout success'));
            }
        });
};

export default loginReducer;