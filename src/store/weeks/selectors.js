export const getWeekById = (state, id) => state.byId[id];
export const getWeeks = (state, id) => state.all.map(id => state.byId[id]);