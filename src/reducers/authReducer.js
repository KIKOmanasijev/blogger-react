import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_WITH_STORAGE
} from '../actions/types';

const initialState = {
    token: localStorage.getItem("jwt"),
    isAuth: false,
    isLoading: false,
    user: null
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            // localStorage.setItem('jwt', action.payload.jwt);
            // localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('jwt', action.payload.jwt);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            // console.log(action.payload);
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                token: action.payload.jwt,
                user: action.payload.user
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false,
                isLoading: false
            }
        case LOGIN_WITH_STORAGE:
            return {
                isAuth: true,
                token: action.payload.token,
                isLoading: false,
                user: action.payload
            }
        default:
            return state;
    }
}