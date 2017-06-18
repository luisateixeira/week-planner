import { all }  from 'redux-saga/effects';
import recipesSaga from './recipes/sagas';

function* rootSaga() {
  yield all([
    recipesSaga()
  ]);
};

export default rootSaga;