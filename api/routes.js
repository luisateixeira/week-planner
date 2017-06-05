
module.exports = (app, db) => {
    const recipesController = require('./recipes/controller')(db);
    app.get('/recipes', recipesController.getRecipes);
    app.get('/recipes/:id', recipesController.getRecipeById);
    app.post('/recipes', recipesController.createRecipe);
    app.put('/recipes/:id', recipesController.updateRecipe);

    const plannerController = require('./planner/controller')(db);
    app.get('/weeks', plannerController.getWeeks);
    app.get('/weeks/:id', plannerController.getWeekById);
    app.post('/weeks', plannerController.createWeek);
    app.put('/weeks/:id', plannerController.updateWeek);
}