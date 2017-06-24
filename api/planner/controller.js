module.exports = function(db) {
  const api = require('./api')(db);  
  const handleSuccess = response => result => response.status('200').send(result);
  const handleError = response => error => {
    response.status('500');
    response.statusMessage = error;
    response.end();
  };

  const getWeeks = (request, response) => {
    api.getWeeks()
      .then(handleSuccess(response), handleError(response));
  };

  const getWeekById = (request, response) => {
    api.getWeekById(request.params.id)
      .then(handleSuccess(response), handleError(response));
  };

  const createWeek = (request, response) => {
    api.createWeek(request.body)
      .then(handleSuccess(response), handleError(response));
  };

  const updateWeek = (request, response) => {
    api.updateWeek(request.params.id, request.body)
      .then(handleSuccess(response), handleError(response));
  };

  const deleteWeek = (request, response) => {
    api.deleteWeek(request.params.id)
      .then(handleSuccess(response), handleError(response));
  };

  return {
    getWeeks,
    getWeekById,
    createWeek,
    updateWeek,
    deleteWeek
  };
};
