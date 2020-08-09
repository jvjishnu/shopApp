import { AUTHENTICATE, LOGOUT } from '../actions/authAct';

const initalState = {
    token: null,
    userId: null
}

export const authReducer = (state = initalState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            return {
                initalState
            }
        default:
            return state;
    }
}