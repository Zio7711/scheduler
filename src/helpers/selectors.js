export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter((days) => days.name === day);
  if (state.days.length === 0 || filteredDay.length === 0) {
    return [];
  }
  return filteredDay[0].appointments.map((apponitmentNum) => {
    return state.appointments[apponitmentNum];
  });
}

