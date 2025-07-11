import { put,call} from 'redux-saga/effects';
import { getNewsSuccess } from '../../actions';
import { NewsService } from '../../services/demo';

export function* fetchNews(action) {
  const { data } = yield call(NewsService.getInstance().getNews, action.payload);
  yield put(getNewsSuccess(data));
}
