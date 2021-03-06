import { combineReducers } from 'redux';
import { ActionsTypes } from './actions';
import { getSuccessState, getErrorState } from '../common/reducer-utils';

const all = (state = [], action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPES_SUCCEED: 
      return action.payload.map(recipe => recipe.id);
    case ActionsTypes.DELETE_RECIPE_SUCCEED: {
      const newState = [ ...state ];
      const index = newState.indexOf(action.payload.id);
      if (index > -1) {
        newState.splice(index, 1);
      }
      return newState;
    }
  default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_RECIPES_SUCCEED: {
      const newState = action.payload.reduce((accum, recipe) => {
        accum[recipe.id] = recipe;
        return accum;
      }, {});
      return { ...state, ...newState };
    }
    case ActionsTypes.FETCH_RECIPE_BY_ID_SUCCEED:
    case ActionsTypes.CREATE_RECIPE_SUCCEED:
    case ActionsTypes.UPDATE_RECIPE_SUCCEED:
      return { ...state, [action.payload.id]:action.payload };
    case ActionsTypes.DELETE_RECIPE_SUCCEED: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

const isFetching = combineReducers({
  all: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.FETCH_RECIPES_START],
    [ActionsTypes.FETCH_RECIPES_SUCCEED, ActionsTypes.FETCH_RECIPES_ERROR],
  ),

  byId: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.FETCH_RECIPE_BY_ID_START],
    [ActionsTypes.FETCH_RECIPE_BY_ID_SUCCEED, ActionsTypes.FETCH_RECIPE_BY_ID_ERROR],
  ),
  
  create: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.CREATE_RECIPE_START],
    [ActionsTypes.CREATE_RECIPE_SUCCEED, ActionsTypes.CREATE_RECIPE_ERROR],
  ),

  update: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.UPDATE_RECIPE_START],
    [ActionsTypes.UPDATE_RECIPE_SUCCEED, ActionsTypes.UPDATE_RECIPE_ERROR],
  ),

  delete: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.DELETE_RECIPE_START],
    [ActionsTypes.DELETE_RECIPE_SUCCEED, ActionsTypes.DELETE_RECIPE_ERROR],
  ),
});

const isError = combineReducers({
  all: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.FETCH_RECIPES_ERROR],
    [ActionsTypes.FETCH_RECIPES_START, ActionsTypes.FETCH_RECIPES_SUCCEED],
  ),

  byId: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.FETCH_RECIPE_BY_ID_ERROR],
    [ActionsTypes.FETCH_RECIPE_BY_ID_START, ActionsTypes.FETCH_RECIPE_BY_ID_SUCCEED],
  ),
  
  create: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.CREATE_RECIPE_ERROR],
    [ActionsTypes.CREATE_RECIPE_START, ActionsTypes.CREATE_RECIPE_SUCCEED],
  ),

  update: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.UPDATE_RECIPE_ERROR],
    [ActionsTypes.UPDATE_RECIPE_START, ActionsTypes.UPDATE_RECIPE_SUCCEED],
  ),

  delete: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.DELETE_RECIPE_ERROR],
    [ActionsTypes.DELETE_RECIPE_START, ActionsTypes.DELETE_RECIPE_SUCCEED],
  )
});

export default combineReducers({
  all,
  byId,
  isFetching,
  isError
});
