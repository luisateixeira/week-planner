import { all }  from 'redux-saga/effects';
import recipesSaga from './recipes/sagas';
import weeksSaga from './weeks/sagas';

function* rootSaga() {
  yield all([
    recipesSaga(),
    weeksSaga(),
  ]);
};

export default rootSaga;