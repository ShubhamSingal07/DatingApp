import Actions from '../actions';

const authReducer = (
  state = {
    inProgress: false,
    loggedIn: false,
    errors: undefined,
    socket: undefined
  },
  { type, payload },
) => {
  switch (type) {
    case Actions.loginInProgress:
      return {
        ...state,
        inProgress: true,
        errors: undefined,
      };
    case Actions.loginSuccess:
      return {
        ...state,
        inProgress: false,
        loggedIn: true,
        errors: undefined,
        socket: payload.socket
      }
    case Actions.loginFail:
      return {
        ...state,
        inProgress: false,
        loggedIn: false,
        errors: payload.errors,
        socket: undefined
      };
    case Actions.SignupSuccess:
      return {
        ...state,
        inProgress: false,
        errors: undefined,
        loggedIn: true,
        socket: payload.socket
      };
    case Actions.SignupInProgress:
      return {
        ...state,
        inProgress: true,
        errors: undefined,
      };
    case Actions.SignupFail:
      return {
        ...state,
        inProgress: false,
        errors: payload.errors,
        socket: undefined
      };
    case Actions.logout:
      return {
        ...state,
        inProgress: false,
        loggedIn: false,
        errors: undefined,
        socket: undefined
      };
    default:
      return state;
  }
}

export default authReducer;
