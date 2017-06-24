import { call, put, takeLatest, all, select  } from 'redux-saga/effects';
import { ActionsTypes } from './actions';
import * as selectors from '../selectors';
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

function* updateRecipe(action) {
  try {
    const { id, ...recipe } =  action.payload;
    const request = Api(`/recipes/${id}`, recipe, 'PUT');
    const payload = yield call(request);
    yield put({type: ActionsTypes.UPDATE_RECIPE_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.UPDATE_RECIPE_ERROR, error});
  }
}

function* deleteRecipe(action) {
  try {
    const request = Api(`/recipes/${action.payload.id}`, undefined, 'DELETE');
    const payload = yield call(request);
    yield put({type: ActionsTypes.DELETE_RECIPE_SUCCEED, payload});
  } catch (error) {
    yield put({type: ActionsTypes.DELETE_RECIPE_ERROR, error});
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

function* watchUpdateRecipe() {
  yield takeLatest(ActionsTypes.UPDATE_RECIPE_START, updateRecipe);
}

function* watchDeleteRecipe() {
  yield takeLatest(ActionsTypes.DELETE_RECIPE_START, deleteRecipe);
}

export default function* rootSaga() {
  yield all([
    watchFetchRecipes(),
    watchFetchRecipeById(),
    watchCreateRecipe(),
    watchUpdateRecipe(),
    watchDeleteRecipe()
  ]);
};;


