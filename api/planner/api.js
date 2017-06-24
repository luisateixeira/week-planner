module.exports = function(db) {
  const R = require('ramda');
  var cuid = require('cuid');

  const save = (json, id, week) => {
      const weeks = json.weeks || {};
      weeks[id] = week;
      json.weeks = weeks;
      return db.save(json).then(() => week);
  };

  const getDayPlanner = () => ({
    dinner: {
      week: null
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

  const mealReducer = (weeks, day) => (accum, meal) => {
    accum[meal] = {
      week: weeks[day[meal].weekID]
    }
    return accum;
  }

  const dayReducer = (weeks, planner) => (accum, day) => {
    accum[day] = Object.keys(planner[day])
      .reduce(mealReducer(weeks, planner[day]), {});
    return accum;
  }

  const withRecipes = (weeks, planner) => 
    Object.keys(planner).reduce(dayReducer(weeks, planner), {});

  const getWeeks = () => {
    return db.get().then(json => {
      const weeks = json.weeks || {};
      
      const groupByYear =  Object.keys(weeks).
        reduce((accum, id) => {
          const year = weeks[id].year;
          accum[year] = accum[year] || [];
          accum[year].push(weeks[id]);
          accum[year].sort((a,b) => b.number - a.number);
          return accum;
        }, {});

      return Object.keys(groupByYear)
        .sort((a, b) => b - a)
        .reduce((accum, year) => accum.concat(groupByYear[year]), [])
  
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
      const id = cuid();
      
      const weekByNumber = Object.keys(weeks)
        .filter((id) => weeks[id].year === body.year)
        .reduce((accum, id) => {
          accum[weeks[id].number] = weeks[id];
          return accum;
        }, {});

      if (weekByNumber[body.number]) {
        return Promise.reject(`Week already exists (id: ${weekByNumber[body.number].id})!`);
      }
      
      return save(json, id, {
        id, 
        number, 
        year, 
        planner: getWeekPlanner(withRecipes(json.weeks, planner))
      });
    });
  };

  const updateWeek = (id, body) => {
    return db.get().then(json => {
      const { number, year, planner = {} } = body;
      const weeks = json.weeks || {};
      const week = weeks[id];
      if (week) {
        return save(json, id, { 
          id, 
          number, 
          year, 
          planner: getWeekPlanner(withRecipes(json.weeks, planner))
        });
      }
      return Promise.reject(`Week with id ${id} doesn't exist!`);
    });
  };

  const deleteWeek = (id) => {
    return db.get().then(json => {
      const weeks = json.weeks || {};
      const week = weeks[id];
      if (week) {
        delete weeks[id];
        json.weeks = weeks;
        return db.save(json).then(() => week);
      }
      return Promise.reject(`Week with id ${id} doesn't exist!`);
    });
  };

  return {
    getWeeks,
    getWeekById,
    createWeek,
    updateWeek,
    deleteWeek
  };
};
