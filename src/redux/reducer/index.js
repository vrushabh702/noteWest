import { combineReducers } from 'redux';
//import { connectRouter } from 'connected-react-router';
//import { History } from 'history';
import * as demoReducer from './demo.reducer';

const createRootReducer = (history) => combineReducers(Object.assign(
    //{ router: connectRouter(history) },
    demoReducer
));
export default createRootReducer;
