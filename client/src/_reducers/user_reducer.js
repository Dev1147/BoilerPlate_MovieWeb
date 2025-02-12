import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from '../_actions/types';

const initialState = {
  loginSuccess: false
};

// state가 undefined일 경우 초기 상태를 반환하도록 수정
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }; 

    case REGISTER_USER:
      return { ...state, register: action.payload };
   
    case AUTH_USER:
      return { ...state, userData: action.payload };

    case LOGOUT_USER:
        return {...state, logoutSuccess: action.payload }
        
    default:
      return state;  // 기본 상태 반환
  }
}

//export default userReducer;
