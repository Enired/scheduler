import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const useApplicationData = () => {

  //STATE CONSTANTS
  const [state, setState] = useState({ day: 'Monday', days: [], appointments: {} });
  const setDay = day => setState({ ...state, day });

  //AXIOS REQUEST
  const daysUrl = "/api/days";
  const appointmentsUrl = "/api/appointments";
  const interviewerURL = "/api/interviewers";

  useEffect(() => {
    const getDays = axios.get(daysUrl);
    const getAppts = axios.get(appointmentsUrl);
    const getInt = axios.get(interviewerURL);
    Promise.all([getDays, getAppts, getInt])
      .then(res => {
        const days = res[0].data;
        const appointments = res[1].data;
        const interviewers = res[2].data;
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);

  const updateSpots = (state, appointments) => {
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    const currentDay = state.days[currentDayIndex];
    const spots = currentDay.appointments.filter((id) => !appointments[id].interview).length;
    const updatedDayObj = { ...currentDay, spots };
    const updatedDays = [...state.days];
    updatedDays[currentDayIndex] = updatedDayObj;
    return updatedDays;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`${appointmentsUrl}/${id}`, appointment)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState((prev) => ({ ...prev, appointments, days }));
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`${appointmentsUrl}/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState((prev) => ({ ...prev, appointments, days }));
      });
  };
  return { state, setDay, bookInterview, cancelInterview };
};