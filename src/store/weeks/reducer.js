import { combineReducers } from 'redux';
import { ActionsTypes } from './actions';
import { getSuccessState, getErrorState } from '../common/reducer-utils';

const all = (state = [], action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_WEEKS_SUCCEED: 
      return action.payload.map(week => week.id);
    case ActionsTypes.DELETE_WEEK_SUCCEED: {
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
    case ActionsTypes.FETCH_WEEKS_SUCCEED: {
      const newState = action.payload.reduce((accum, recipe) => {
        accum[recipe.id] = recipe;
        return accum;
      }, {});
      return { ...state, ...newState };
    }
    case ActionsTypes.FETCH_WEEK_BY_ID_SUCCEED:
    case ActionsTypes.CREATE_WEEK_SUCCEED:
    case ActionsTypes.UPDATE_WEEK_SUCCEED:
      return { ...state, [action.payload.id]:action.payload };
    case ActionsTypes.DELETE_WEEK_SUCCEED: {
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
    [ActionsTypes.FETCH_WEEKS_START],
    [ActionsTypes.FETCH_WEEKS_SUCCEED, ActionsTypes.FETCH_WEEKS_ERROR],
  ),

  byId: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.FETCH_WEEK_BY_ID_START],
    [ActionsTypes.FETCH_WEEK_BY_ID_SUCCEED, ActionsTypes.FETCH_WEEK_BY_ID_ERROR],
  ),
  
  create: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.CREATE_WEEK_START],
    [ActionsTypes.CREATE_WEEK_SUCCEED, ActionsTypes.CREATE_WEEK_ERROR],
  ),

  update: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.UPDATE_WEEK_START],
    [ActionsTypes.UPDATE_WEEK_SUCCEED, ActionsTypes.UPDATE_WEEK_ERROR],
  ),

  delete: (state, action) => getSuccessState(
    state, action,
    [ActionsTypes.DELETE_WEEK_START],
    [ActionsTypes.DELETE_WEEK_SUCCEED, ActionsTypes.DELETE_WEEK_ERROR],
  ),
});

const isError = combineReducers({
  all: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.FETCH_WEEKS_ERROR],
    [ActionsTypes.FETCH_WEEKS_START, ActionsTypes.FETCH_WEEKS_SUCCEED],
  ),

  byId: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.FETCH_WEEK_BY_ID_ERROR],
    [ActionsTypes.FETCH_WEEK_BY_ID_START, ActionsTypes.FETCH_WEEK_BY_ID_SUCCEED],
  ),
  
  create: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.CREATE_WEEK_ERROR],
    [ActionsTypes.CREATE_WEEK_START, ActionsTypes.CREATE_WEEK_SUCCEED],
  ),

  update: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.UPDATE_WEEK_ERROR],
    [ActionsTypes.UPDATE_WEEK_START, ActionsTypes.UPDATE_WEEK_SUCCEED],
  ),

  delete: (state, action) => getErrorState(
    state, action,
    [ActionsTypes.DELETE_WEEK_ERROR],
    [ActionsTypes.DELETE_WEEK_START, ActionsTypes.DELETE_WEEK_SUCCEED],
  )
});

export default combineReducers({
  all,
  byId,
  isFetching,
  isError
});