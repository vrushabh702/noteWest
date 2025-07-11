import { NEWS } from "../lib/constants/actions";
export const demoReducer = (state = {}, action) => {
    switch (action.type) {
        case NEWS.GET_NEWS:
        //return { ...state, loading: true };
        case NEWS.SET_NEWS:
            return { ...state, news: action.payload }
        default:
            return state;
    }
};


