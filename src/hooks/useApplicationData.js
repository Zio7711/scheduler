import axios from 'axios';
import { useEffect, useState } from 'react';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //useEffect hook to get data from the api
  useEffect(() => {
    const getDaysURL = 'http://localhost:8001/api/days';
    const getAppointmentsURL = 'http://localhost:8001/api/appointments';
    const getInterviewersURL = 'http://localhost:8001/api/interviewers';

    Promise.all([
      axios.get(getDaysURL),
      axios.get(getAppointmentsURL),
      axios.get(getInterviewersURL),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      //create setters for states
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);
  // console.log('state', state);
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
      })
      .then(() => {
        const filteredDay = state.days.filter((el) => {
          return el.name === state.day;
        });

        const updatedDay = {
          ...filteredDay[0],
          spots: filteredDay[0].spots - 1,
        };

        const daysToUpdateIndex = state.days.findIndex(
          (days) => days.name === state.day
        );

        const updatedDays = [
          ...state.days.slice(0, daysToUpdateIndex),
          updatedDay,
          ...state.days.slice(daysToUpdateIndex + 1),
        ];

        setState((prev) => ({
          ...prev,
          days: updatedDays,
        }));
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(() => {
        const filteredDay = state.days.filter((el) => {
          return el.name === state.day;
        });

        const updatedDay = {
          ...filteredDay[0],
          spots: filteredDay[0].spots + 1,
        };
        const daysToUpdateIndex = state.days.findIndex(
          (days) => days.name === state.day
        );

        const updatedDays = [
          ...state.days.slice(0, daysToUpdateIndex),
          updatedDay,
          ...state.days.slice(daysToUpdateIndex + 1),
        ];

        setState((prev) => ({
          ...prev,
          days: updatedDays,
        }));
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
