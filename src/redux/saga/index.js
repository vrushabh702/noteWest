import {NEWS} from "../lib/constants/actions";
import { takeLatest } from 'redux-saga/effects';
import * as news from './GetNews';


export default function* rootSaga() {

    // Saga for Reports Reducer
    yield takeLatest(NEWS.GET_NEWS,  news.fetchNews);
    
}