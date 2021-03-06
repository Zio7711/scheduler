import axios from 'axios';
import { useEffect, useReducer } from 'react';
import reducer, {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from 'reducers/application';

const useApplicationData = () => {
  //setup useReducer hook
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
    const getDaysURL = 'https://zio-scheduler.herokuapp.com/api/days';
    const getAppointmentsURL =
      'https://zio-scheduler.herokuapp.com/api/appointments';
    const getInterviewersURL =
      'https://zio-scheduler.herokuapp.com/api/interviewers';

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

    // const schedularSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // // const schedularSocket = new WebSocket('ws://localhost:8001');
    // schedularSocket.onopen = function () {
    //   schedularSocket.send('ping');
    // };
    // schedularSocket.onmessage = (event) => {
    //   const appointmentData = JSON.parse(event.data);
    //   if (appointmentData.type === 'SET_INTERVIEW') {
    //     dispatch({
    //       type: SET_INTERVIEW,
    //       id: appointmentData.id,
    //       interview: appointmentData.interview,
    //     });
    //   }
    // };
  }, []);

  //function to book an interview
  const bookInterview = (id, interview) => {
    return axios
      .put(`https://zio-scheduler.herokuapp.com/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  //function to delete an appointment
  const cancelInterview = (id) => {
    return axios
      .delete(`https://zio-scheduler.herokuapp.com/api/appointments/${id}`)
      .then(() => {
        //update interview
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
