import {NEWS} from "../lib/constants/actions";
import { action } from 'typesafe-actions';
/*export const getNews = (data:any) => ({
    type: 'GET_NEWS',
});*/

export const getNews = (data) => action(NEWS.GET_NEWS, data);
export const getNewsSuccess = (data) => action(NEWS.SET_NEWS, data);