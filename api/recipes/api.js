module.exports = function(db) {
  
  const save = (json, id, recipe) => {
      const recipes = json.recipes || {};
      recipes[id] = recipe;
      json.recipes = recipes;
      return db.save(json).then(() => recipe);
  };

  const getRecipes = () => {
    return db.get().then(json => {
      const recipes = json.recipes || {};
      return Object.keys(recipes).map((key) => recipes[key]);
    });
  };

  const getRecipeById = (id) => {
    return db.get().then(json => {
      const recipes = json.recipes || {};

      if (recipes[id]) {
        return recipes[id];
      }
      return Promise.reject(`Recipe with id ${id} doesn't exist!`);
    });
  };

  const createRecipe = (body) => {
    return db.get().then(json => {
      console.log('body', body);
      const { url, title, description } = body;
      const recipes = json.recipes || {};
      const id = Object.keys(recipes).length;
      return save(json, id, { id, title, url, description });
    });
  };

  const updateRecipe = (id, body) => {
    return db.get().then(json => {
      const { url, title, description } = body;
      const recipes = json.recipes || {};
      const recipe = recipes[id];
      if (recipe) {
        return save(json, id, { id, title, url, description });
      }
      return Promise.reject(`Recipe with id ${id} doesn't exist!`);
    });
  };

  return {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe
  };
};
