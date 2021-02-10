import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
} from './types';

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState ) => {
    dispatch({ type: USER_LOADING });
    const token = getState().auth.token;
    const config = {
        headers: {
            'Authorization': null
        }
    }

    if (token){
        config.headers['Authorization'] = token;
    }
    
    axios.post('http://localhost:8080/api/authors', config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        })
            
            
}

export const register = ({email, password}) => dispatch => {
    const body = JSON.stringify({ email, password });
    
    axios
      .post("http://localhost:8080/api/auth/register", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .then(() => {
        axios
          .post(
            "http://localhost:8080/api/auth/authenticate",
            {
              email: email, 
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data,
            });
          })
          .catch((err) => {
            dispatch({
              type: LOGIN_FAIL,
            });
          });
      })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const login = (user) => (dispatch, getState) => {
    const body = JSON.stringify(user);

    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'  
    //     }
    // }

    // if (token){
    //     config.headers['Authorization'] = token;
    // }
    axios
      .post(
        "http://localhost:8080/api/auth/authenticate",
        {
          email: user.username,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAIL,
        });
      });
}

export const loginWithStorage = (user) => {
    return {
        type: 'LOGIN_WITH_STORAGE',
        payload: user
    }
}