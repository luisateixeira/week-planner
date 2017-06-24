
export const ActionsTypes = {
  FETCH_WEEKS_START: 'FETCH_WEEKS_START',
  FETCH_WEEKS_SUCCEED: 'FETCH_WEEKS_SUCCEED',
  FETCH_WEEKS_ERROR: 'FETCH_WEEKS_ERROR',

  FETCH_WEEK_BY_ID_START: 'FETCH_WEEK_BY_ID_START',
  FETCH_WEEK_BY_ID_SUCCEED: 'FETCH_WEEK_BY_ID_SUCCEED',
  FETCH_WEEK_BY_ID_ERROR: 'FETCH_WEEK_BY_ID_ERROR',

  CREATE_WEEK_START: 'CREATE_WEEK_START',
  CREATE_WEEK_SUCCEED: 'CREATE_WEEK_SUCCEED',
  CREATE_WEEK_ERROR: 'CREATE_WEEK_ERROR',

  UPDATE_WEEK_START: 'UPDATE_WEEK_START',
  UPDATE_WEEK_SUCCEED: 'UPDATE_WEEK_SUCCEED',
  UPDATE_WEEK_ERROR: 'UPDATE_WEEK_ERROR',

  DELETE_WEEK_START: 'DELETE_WEEK_START',
  DELETE_WEEK_SUCCEED: 'DELETE_WEEK_SUCCEED',
  DELETE_WEEK_ERROR: 'DELETE_WEEK_ERROR',
}

export const fetchWeeks = () => ({
  type: ActionsTypes.FETCH_WEEKS_START
});

export const fetchWeekById = id => ({
  type: ActionsTypes.FETCH_WEEK_BY_ID_START,
  payload: {
    id
  }
});

export const createWeek = payload => ({
  type: ActionsTypes.CREATE_WEEK_START,
  payload
});


export const updateWeek = payload => ({
  type: ActionsTypes.UPDATE_WEEK_START,
  payload
});

export const deleteWeek = id => ({
  type: ActionsTypes.DELETE_WEEK_START,
  payload: {
    id
  }
});
