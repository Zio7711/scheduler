import React from 'react';
import DayList from './DayList';
import Appointment from './Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';

import 'components/Application.scss';
import useApplicationData from 'hooks/useApplicationData';
import Loading from './Loading';

const Application = () => {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  //get appointments for a specific day

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //loop over each appointment to pass state and props to Appointment component
  const Appointments = dailyAppointments.map((appointment) => {
    //get interview and interviewers for that specific day and appointment
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <>
      {dailyInterviewers.length ? (
        <main className='layout'>
          <section className='sidebar'>
            <img
              className='sidebar--centered'
              src='images/logo.png'
              alt='Interview Scheduler'
            />
            <hr className='sidebar__separator sidebar--centered' />
            <nav className='sidebar__menu'>
              <DayList days={state.days} day={state.day} setDay={setDay} />
            </nav>
            <img
              className='sidebar__lhl sidebar--centered'
              src='images/lhl.png'
              alt='Lighthouse Labs'
            />
          </section>
          <section className='schedule'>
            {Appointments}
            <Appointment key='last' time='5pm' />
          </section>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Application;
