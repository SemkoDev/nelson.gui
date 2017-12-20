import { combineReducers } from 'redux';
import nelsonAPIReducer from './nelson-api';

const rootReducer = combineReducers({
    nelson: nelsonAPIReducer
});
export default rootReducer;
