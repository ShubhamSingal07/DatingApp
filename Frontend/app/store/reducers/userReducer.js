import Actions from '../actions';

const userReducer = (
    state = {
        id: undefined,
        data: undefined,
        image: undefined
    },
    { type, payload },
) => {
    switch (type) {
        case Actions.loginSuccess:
            return {
                ...state,
                id: payload.id,
                data: payload.username,
                image: payload.image
            };
        case Actions.SignupSuccess:
            return {
                ...state,
                id: payload.id,
                data: payload.username,
                image: payload.image
            };
        case Actions.logout:
            return {
                ...state,
                id: undefined,
                data: undefined,
                image: undefined
            };
        case Actions.loginFail:
            return {
                ...state,
                id: undefined,
                data: undefined,
                image: undefined
            };
        default:
            return state;
    }
};

export default userReducer;
