import { call, put, takeLatest, all, select  } from 'redux-saga/effects';
import { ActionsTypes } from './actions';
import * as selectors from '../reducer';
import Api from '../api';

function* fetchRecipes(action) {
  try {
    const request = Api('/recipes');
    const payload = yield call(request);
    yield put({type: ActionsTypes.FETCH_RECIPES_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.FETCH_RECIPES_ERROR, error});
  }
}

function* fetchRecipeByID(action) {
  try {
    const recipe = yield select(selectors.getRecipeById, action.payload.id);
    const request = Api(`/recipes/${action.payload.id}`);
    const payload = yield recipe || call(request);
    yield put({type: ActionsTypes.FETCH_RECIPE_BY_ID_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.FETCH_RECIPE_BY_ID_ERROR, error});
  }
}

function* createRecipe(action) {
  try {
    const request = Api(`/recipes`, action.payload, 'POST');
    const payload = yield call(request);
    yield put({type: ActionsTypes.CREATE_RECIPE_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.CREATE_RECIPE_ERROR, error});
  }
}

function* watchFetchRecipes() {
  yield takeLatest(ActionsTypes.FETCH_RECIPES_START, fetchRecipes);
}

function* watchFetchRecipeById() {
  yield takeLatest(ActionsTypes.FETCH_RECIPE_BY_ID_START, fetchRecipeByID);
}

function* watchCreateRecipe() {
  yield takeLatest(ActionsTypes.CREATE_RECIPE_START, createRecipe);
}

export default function* rootSaga() {
  yield all([
    watchFetchRecipes(),
    watchFetchRecipeById(),
    watchCreateRecipe(),
  ]);
};;


