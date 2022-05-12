import { AUTHENTICATE, SET_DID_TRY_AL, LOGOUT } from '../actions/auth';

const initialState = {
  email: null,
  token: null,
  didTryAutoLogin: false //SET TO FALSE FOR PRODUCTION, if set to true, there will be no auto login attempt
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        email: action.email,
        token: action.token,
        didTryAutoLogin: true
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    default:
      return state;
  }
};
