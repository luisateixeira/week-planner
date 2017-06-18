import { combineReducers } from 'redux';
import { ActionsTypes } from './actions';

const all = (state = [], action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPES_SUCCEED: 
      return action.payload
        .map(recipe => recipe.id)
        .reduce((accum, id) => {
          if (accum.indexOf(id) === -1) {
            accum.push(id);
          }
          return accum;
        }, [ ...state ]);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPES_SUCCEED: 
      const newState = action.payload.reduce((accum, recipe) => {
        accum[recipe.id] = recipe;
        return accum;
      }, {});
      return { ...state, ...newState };
    case ActionsTypes.FETCH_RECIPE_BY_ID_SUCCEED:
    case ActionsTypes.CREATE_RECIPE_SUCCEED:
      return { ...state, [action.payload.id]:action.payload };
    default:
      return state;
  }
};

const isFetchingAll = (state = false, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPES_START: 
      return true;
    case ActionsTypes.FETCH_RECIPES_SUCCEED: 
    case ActionsTypes.FETCH_RECIPES_ERROR: 
      return false;
    default:
      return state;
  }
};

const isFetchingById = (state = false, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPE_BY_ID_START: 
      return true;
    case ActionsTypes.FETCH_RECIPE_BY_ID_SUCCEED: 
    case ActionsTypes.FETCH_RECIPE_BY_ID_ERROR: 
      return false;
    default:
      return state;
  }
};

const errorFetchingAll = (state = { value: false }, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPES_ERROR: 
      return {
        error: action.error,
        value: true
      };
    case ActionsTypes.FETCH_RECIPES_SUCCEED: 
    case ActionsTypes.FETCH_RECIPES_START: 
      return {
        value: false
      };
    default:
      return state;
  }
};

const errorFetchingById = (state = { value: false }, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPE_BY_ID_ERROR: 
      return {
        error: action.error,
        value: true
      };
    case ActionsTypes.FETCH_RECIPE_BY_ID_SUCCEED: 
    case ActionsTypes.FETCH_RECIPE_BY_ID_START: 
      return {
        value: false
      };
    default:
      return state;
  }
};

export default combineReducers({
  all,
  byId,
  isFetchingAll,
  isFetchingById,
  errorFetchingAll,
  errorFetchingById
});

export const getRecipeById = (state, id) => state.byId[id];