import { call, put, takeLatest, all, select  } from 'redux-saga/effects';
import { ActionsTypes } from './actions';
import * as selectors from '../selectors';
import Api from '../api';

function* fetchWeeks(action) {
  try {
    const request = Api('/weeks');
    const payload = yield call(request);
    yield put({type: ActionsTypes.FETCH_WEEKS_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.FETCH_WEEKS_ERROR, error});
  }
}

function* fetchWeekByID(action) {
  try {
    const week = yield select(selectors.getWeekById, action.payload.id);
    const request = Api(`/weeks/${action.payload.id}`);
    const payload = yield week || call(request);
    yield put({type: ActionsTypes.FETCH_WEEK_BY_ID_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.FETCH_WEEK_BY_ID_ERROR, error});
  }
}

function* createWeek(action) {
  try {
    const request = Api(`/weeks`, action.payload, 'POST');
    const payload = yield call(request);
    yield put({type: ActionsTypes.CREATE_WEEK_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.CREATE_WEEK_ERROR, error});
  }
}

function* updateWeek(action) {
  try {
    const { id, ...week } =  action.payload;
    const request = Api(`/weeks/${id}`, week, 'PUT');
    const payload = yield call(request);
    yield put({type: ActionsTypes.UPDATE_WEEK_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.UPDATE_WEEK_ERROR, error});
  }
}

function* deleteWeek(action) {
  try {
    const request = Api(`/weeks/${action.payload.id}`, undefined, 'DELETE');
    const payload = yield call(request);
    yield put({type: ActionsTypes.DELETE_WEEK_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.DELETE_WEEK_ERROR, error});
  }
}

function* watchFetchWeeks() {
  yield takeLatest(ActionsTypes.FETCH_WEEKS_START, fetchWeeks);
}

function* watchFetchWeekById() {
  yield takeLatest(ActionsTypes.FETCH_WEEK_BY_ID_START, fetchWeekByID);
}

function* watchCreateWeek() {
  yield takeLatest(ActionsTypes.CREATE_WEEK_START, createWeek);
}

function* watchUpdateWeek() {
  yield takeLatest(ActionsTypes.UPDATE_WEEK_START, updateWeek);
}

function* watchDeleteWeek() {
  yield takeLatest(ActionsTypes.DELETE_WEEK_START, deleteWeek);
}

export default function* rootSaga() {
  yield all([
    watchFetchWeeks(),
    watchFetchWeekById(),
    watchCreateWeek(),
    watchUpdateWeek(),
    watchDeleteWeek()
  ]);
};;


