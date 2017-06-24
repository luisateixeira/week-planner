export const getRecipeById = (state, id) => state.byId[id];
export const getRecipes = (state, id) => state.all.map(id => state.byId[id]);