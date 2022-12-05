import { combineReducers } from 'redux';
import AuthReducer from './authReducer'; 
import ReceptionistReducer from './receptionistReducer';
import VisitorReducer from './visitorReducer';

const rootReducer = combineReducers({
  auth:AuthReducer, 
  visitor:VisitorReducer, 
  receptioninst:ReceptionistReducer, 
  });
export default rootReducer;