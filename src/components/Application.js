import React from "react";
import "components/DayList"
import "components/InterviewerListItem"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


import "components/Application.scss";

import DayList from "components/DayList";
import "components/Appointment"
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "./helpers/selectors";

export default function Application(props) {
  
  const [state, setState] = useState({day: 'Monday', days: [], appointments :{}})
  
  const setDay = day => setState({...state, day})
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const daysUrl = "http://localhost:8001/api/days"
  const appointmentsUrl = "http://localhost:8001/api/appointments"

  const getDays = axios.get(daysUrl)
  const getAppts = axios.get(appointmentsUrl)

  Promise.all([getDays, getAppts])
  .then(res => {
    const days = res[0].data
    const appointments = res[1].data

    setState((prev)=>({...prev, days, appointments: appointments}),[])

  })

  const appointments = Object.values(dailyAppointments).map((e)=>{
    const key = e.id;
    return (
    <Appointment 
    key={key} 
    {... e}
    />)
  })

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
  <DayList days={state.days} value={state.day} onChange={setDay}/>
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
