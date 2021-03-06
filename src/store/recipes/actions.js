
export const ActionsTypes = {
  FETCH_RECIPES_START: 'FETCH_RECIPES_START',
  FETCH_RECIPES_SUCCEED: 'FETCH_RECIPES_SUCCEED',
  FETCH_RECIPES_ERROR: 'FETCH_RECIPES_ERROR',

  FETCH_RECIPE_BY_ID_START: 'FETCH_RECIPE_BY_ID_START',
  FETCH_RECIPE_BY_ID_SUCCEED: 'FETCH_RECIPE_BY_ID_SUCCEED',
  FETCH_RECIPE_BY_ID_ERROR: 'FETCH_RECIPE_BY_ID_ERROR',

  CREATE_RECIPE_START: 'CREATE_RECIPE_START',
  CREATE_RECIPE_SUCCEED: 'CREATE_RECIPE_SUCCEED',
  CREATE_RECIPE_ERROR: 'CREATE_RECIPE_ERROR',

  UPDATE_RECIPE_START: 'UPDATE_RECIPE_START',
  UPDATE_RECIPE_SUCCEED: 'UPDATE_RECIPE_SUCCEED',
  UPDATE_RECIPE_ERROR: 'UPDATE_RECIPE_ERROR',

  DELETE_RECIPE_START: 'DELETE_RECIPE_START',
  DELETE_RECIPE_SUCCEED: 'DELETE_RECIPE_SUCCEED',
  DELETE_RECIPE_ERROR: 'DELETE_RECIPE_ERROR',
}

export const fetchRecipes = () => ({
  type: ActionsTypes.FETCH_RECIPES_START
});

export const fetchRecipeById = id => ({
  type: ActionsTypes.FETCH_RECIPE_BY_ID_START,
  payload: {
    id
  }
});

export const createRecipe = payload => ({
  type: ActionsTypes.CREATE_RECIPE_START,
  payload
});

export const updateRecipe = (payload) => ({
  type: ActionsTypes.UPDATE_RECIPE_START,
  payload
});

export const deleteRecipe = (id) => ({
  type: ActionsTypes.DELETE_RECIPE_START,
  payload: {
    id
  }
});
