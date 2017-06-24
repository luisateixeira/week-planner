import { combineReducers } from 'redux';
import recipes from './recipes/reducer';
import weeks from './weeks/reducer';

export default combineReducers({
  recipes,
  weeks
});
