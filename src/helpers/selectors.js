export const getAppointmentsForDay = (state, day) => {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter((days) => days.name === day);
  if (state.days.length === 0 || filteredDay.length === 0) {
    return [];
  }
  return filteredDay[0].appointments.map((appointmentNum) => {
    return state.appointments[appointmentNum];
  });
};

export const getInterview = (state, interview) => {
  if (!interview) return null;
  const filteredInterview = {
    student: interview.student,
  };

  filteredInterview.interviewer = state.interviewers[interview.interviewer];
  return filteredInterview;
};
