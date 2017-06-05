module.exports = function(db) {
  const api = require('./api')(db);  
  const handleSuccess = response => result => response.status('200').send(result);
  const handleError = response => error => response.status('500').send(error);

  const getRecipes = (request, response) => {
    api.getRecipes()
      .then(handleSuccess(response), handleError(response));
  };

  const getRecipeById = (request, response) => {
    api.getRecipeById(request.params.id)
      .then(handleSuccess(response), handleError(response));
  };

  const createRecipe = (request, response) => {
    api.createRecipe(request.body)
      .then(handleSuccess(response), handleError(response));
  };

  const updateRecipe = (request, response) => {
    api.updateRecipe(request.params.id, request.body)
      .then(handleSuccess(response), handleError(response));
  };

  return {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe
  };
};
