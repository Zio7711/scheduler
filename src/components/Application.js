import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';

import 'components/Application.scss';
import axios from 'axios';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const Appointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

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
      // console.log(interviewers.data);
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);
  // console.log('state.interviewers', state.interviewers);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
