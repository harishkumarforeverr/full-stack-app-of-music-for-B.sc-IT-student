
 
import { types } from "./types";

 function rootReducer(state = [], action) {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        ...action.payload,
      };
    case types.updateProfile:
      return {
        ...state,
        profile: action.payload,
        updating: true,
      };
    case types.dashboardProfile:
      return {
        ...state,
        dashboardProfile: action.payload,
      };
   
    case types.addNewUserToStore:
      return {
        ...state,
        usersList: action.payload,
      };
    //
    default:
      return state;
  }
}

export default rootReducer;