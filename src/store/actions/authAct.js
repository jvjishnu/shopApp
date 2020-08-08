import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
    return ({ type: AUTHENTICATE, userId, token })
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk2RPCntTO1BYlGsiaOuIpn82f06Bl0Og', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errResData = await response.json();
            const errorId = errResData.error.message
            let message = 'Something went wrong!'
            if(errorId === "EMAIL_EXISTS") {
                message = 'An account linked with this email already exists';
            }
            throw new Error(message)
        }

        const resData = await response.json();
        dispatch(authenticate(resData.idToken, resData.localId));
        const expirationDate = new Date(new Date().getTime() + (parseInt(resData.expiresIn) * 1000));
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDk2RPCntTO1BYlGsiaOuIpn82f06Bl0Og', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if(!response.ok) {
            const errResData = await response.json();
            const errorId = errResData.error.message
            let message = 'Something went wrong!'
            if(errorId === "EMAIL_NOT_FOUND") {
                message = 'Email ID doesn\'t exist. Please SignUp first';
            } else if(errorId === "INVALID_PASSWORD") {
                message = 'Incorrect Password. Please try again';
            }
            throw new Error(message)
        }

        const resData = await response.json();
        dispatch(authenticate(resData.idToken, resData.localId));
        const expirationDate = new Date(new Date().getTime() + (parseInt(resData.expiresIn) * 1000));
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId, 
        expiryDate: expirationDate.toISOString()
    }));
}