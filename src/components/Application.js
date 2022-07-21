import React from "react";
import "components/DayList";
import "components/InterviewerListItem";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "./helpers/selectors";
import { useApplicationData } from "hooks/useApplicationData";

export default function Application() {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointments = Object.values(dailyAppointments).map
    ((e) => {
      const key = e.id;
      const interview = getInterview(state, e.interview);

      return (
        <Appointment
          key={key}
          {...e}
          interview={interview}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />);
    });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
