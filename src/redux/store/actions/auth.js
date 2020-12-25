import axios from "axios";
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionType'
export const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
export const auth = (email, password, isLogin) => {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true

        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBnLRxRqLxC_u1UfkGBbvXLezhhdMjZhmA'
        if(isLogin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBnLRxRqLxC_u1UfkGBbvXLezhhdMjZhmA'

        }
        const response = await axios.post(url, authData)
        const data = response.data
        console.log(data)
        const expirationDate = new Date( new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('experationDate', expirationDate)
        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export const autoLogout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('experationDate')
    return {
        type: AUTH_LOGOUT
    }
}
export const autoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        } else {
            const expeatonDate = new Date(localStorage.getItem('experationDate'))
            if (expeatonDate <= new Date()){
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expeatonDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}