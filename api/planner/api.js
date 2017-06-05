module.exports = function(db) {
  const R = require('ramda');
  
  const save = (json, id, week) => {
      const weeks = json.weeks || {};
      weeks[id] = week;
      json.weeks = weeks;
      return db.save(json).then(() => week);
  };

  const getDayPlanner = () => ({
    dinner: {
      recipe: null
    }
  });

  const getWeekPlanner = (planner) => (
    R.mergeDeepLeft(planner, {
      sun: getDayPlanner(),
      mon: getDayPlanner(),
      tue: getDayPlanner(),
      wed: getDayPlanner(),
      thu: getDayPlanner(),
      fri: getDayPlanner(),
      sat: getDayPlanner(),
    }
  ));

  const mealReducer = (recipes, day) => (accum, meal) => {
    accum[meal] = {
      recipe: recipes[day[meal].recipeID]
    }
    return accum;
  }

  const dayReducer = (recipes, planner) => (accum, day) => {
    accum[day] = Object.keys(planner[day])
      .reduce(mealReducer(recipes, planner[day]), {});
    return accum;
  }

  const withRecipes = (recipes) => (planner) => 
    Object.keys(planner).reduce(dayReducer(recipes, planner), {});

  const getWeeks = () => {
    return db.get().then(json => {
      const weeks = json.weeks || {};
      return Object.keys(weeks).map((key) => weeks[key]);
    });
  };

  const getWeekById = (id) => {
    return db.get().then(json => {
      const weeks = json.weeks || {};
      if (weeks[id]) {
        return weeks[id];
      }
      return Promise.reject(`Week with id ${id} doesn't exist!`);
    });
  };
  
  const createWeek = (body) => {
    return db.get().then(json => {
      const { number, year, planner = {} } = body;
      const weeks = json.weeks || {};
      const id = Object.keys(weeks).length;
      const withRecipesFn = withRecipes(json.recipes);
      return save(json, id, { 
        id, 
        number, 
        year, 
        planner: getWeekPlanner(withRecipesFn(planner))
      });
    });
  };

  const updateWeek = (id, body) => {
    console.log("afsdf",body);
    return db.get().then(json => {
      const { number, year, planner = {} } = body;
      const weeks = json.weeks || {};
      const week = weeks[id];
      const withRecipesFn = withRecipes(json.recipes);
      if (week) {
        return save(json, id, { id, number, year, planner: getWeekPlanner(withRecipesFn(planner))});
      }
      return Promise.reject(`Week with id ${id} doesn't exist!`);
    });
  };

  return {
    getWeeks,
    getWeekById,
    createWeek,
    updateWeek
  };
};
