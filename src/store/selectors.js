import * as fromRecipes from './recipes/selectors';
import * as fromWeeks from './weeks/selectors';

export const getRecipeById = (state, id) => fromRecipes.getRecipeById(state.recipes, id);
export const getWeekById = (state, id) => fromWeeks.getWeekById(state.weeks, id);