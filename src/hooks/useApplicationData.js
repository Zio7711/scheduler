import axios from 'axios';
import { useEffect, useReducer } from 'react';

const useApplicationData = () => {
  //replace useState hook with useReducer hook
  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';
  const SET_SPOT = 'SET_SPOT';

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day,
        };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: action.interview,
            },
          },
        };
      }

      case SET_SPOT: {
        return {
          ...state,
          days: action.updatedDays,
        };
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // const setDay = (day) => setState({ ...state, day });
  const setDay = (day) => dispatch({ type: SET_DAY, day: day });

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
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      });
    });

    const schedularSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    schedularSocket.onopen = function (event) {
      schedularSocket.send('ping');
      console.log('WebSocket Open');
    };
    schedularSocket.onmessage = (event) => {
      console.log(event.data);
      const appointmentData = JSON.parse(event.data);
      if (appointmentData.type === 'SET_INTERVIEW') {
        console.log('appointmentData', appointmentData.interview);
        dispatch({
          type: SET_INTERVIEW,
          id: appointmentData.id,
          interview: appointmentData.interview,
        });
      }
    };
  }, []);

  /*   //useEffect hook to connect to websocket
  useEffect(() => {
    const schedularSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    schedularSocket.onopen = function (event) {
      schedularSocket.send('ping');
      console.log('WebSocket Open');
    };
    schedularSocket.onmessage = (event) => {
      console.log(event.data);
      const appointmentData = JSON.parse(event.data);
      console.log('appointmentData', appointmentData.type);
      if (appointmentData.type === 'SET_INTERVIEW') {
        dispatch({
          type: SET_INTERVIEW,
          id: appointmentData.id,
          interview: appointmentData.interview,
        });
      }
    };
  }, []); */

  const bookInterview = (id, interview) => {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
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

        dispatch({ type: SET_SPOT, updatedDays });
      });
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
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

        dispatch({ type: SET_SPOT, updatedDays });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
