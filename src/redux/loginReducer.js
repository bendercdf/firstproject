import {me, setIsAuth} from "./authReducer";
import {serverAPI} from '../dal/axios-instance';
import {stopSubmit} from 'redux-form'

const SET_CAPTCHA_URL = 'LOGIN/SET_CAPTCHA_URL';
const SET_LOGIN_STATUS = 'LOGIN/SET_LOGIN_STATUS';

export const loginStatuses = {
    NOT_INITIALIZED: 'NOT_INITIALIZED',
    ERROR: 'ERROR',
    CAPTCHA_REQUIRED: 'CAPTCHA_REQUIRED',
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS'
};

let initialState = {
    loginStatus: loginStatuses.NOT_INITIALIZED,
    captchaUrl: '',
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAPTCHA_URL :
            return {...state, captchaUrl: action.captchaUrl}
        case SET_LOGIN_STATUS :
            return {...state, loginStatus: action.loginStatus}
        default: {
            return state;
        }
    }
};

export const setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl});
export const setLoginStatus = (loginStatus) => ({type: SET_LOGIN_STATUS, loginStatus});


export const loginAttempt = (values) => async (dispatch) => {
    dispatch(setLoginStatus(loginStatuses.IN_PROGRESS));
    let response = await serverAPI.loginRequest(values.email, values.password, values.rememberMe, values.captcha)
    if (response.data.resultCode === 0) {
        switch (response.data.resultCode) {
            case 0:
                dispatch(setLoginStatus(loginStatuses.SUCCESS));
                dispatch(me());
                break;
            case 1:
                let stopSubmitLoginPswrd = stopSubmit('login-form', {_error: response.data.messages[0]});
                dispatch(stopSubmitLoginPswrd);
                dispatch(setLoginStatus(loginStatuses.ERROR));
                break;
            case 10:
                let stopSubmitCaptcha = stopSubmit('login-form', {_error: response.data.messages[0]});
                dispatch(stopSubmitCaptcha);
                dispatch(setLoginStatus(loginStatuses.CAPTCHA_REQUIRED));
                serverAPI.captchaRequest().then((res) => {
                    dispatch(setCaptchaUrl(response.data.url));
                });
                break;
            default:
                break;
        }
    }
};

export const logOutAttempt = () => async (dispatch) => {
    let response = await serverAPI.logoutRequest();
    if (response.data.resultCode === 0) {
        dispatch(setIsAuth(false, {id: null, login: null, email: null,}));
        dispatch(setLoginStatus(loginStatuses.NOT_INITIALIZED));
    }
}

export default loginReducer;