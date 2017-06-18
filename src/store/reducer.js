import { combineReducers } from 'redux';
import recipes, * as fromRecipes from './recipes/reducer';

export default combineReducers({
  recipes
});

export const getRecipeById = (state, id) => fromRecipes.getRecipeById(state.recipes, id);