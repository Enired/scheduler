import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const useApplicationData = () => {

 //STATE CONSTANTS
 const [state, setState] = useState({day: 'Monday', days: [], appointments :{}})
 const setDay = day => setState({...state, day})

 
 //AXIOS REQUEST
 const daysUrl = "http://localhost:8001/api/days"
 const appointmentsUrl = "http://localhost:8001/api/appointments"
 const interviewerURL = "http://localhost:8001/api/interviewers"
 
  useEffect(()=>{
    const getDays = axios.get(daysUrl)
    const getAppts = axios.get(appointmentsUrl)
    const getInt = axios.get(interviewerURL)
    Promise.all([getDays, getAppts, getInt])
    .then(res => {
      const days = res[0].data
      const appointments = res[1].data
      const interviewers = res[2].data
      setState((prev)=>({...prev, days, appointments, interviewers}))      
    })
  }, [])

 
const updateSpots = (state) => {
  const currentDayIndex = state.days.findIndex((day)=>day.name === state.day);
  const currentDay = state.days[currentDayIndex];
  const spots = currentDay.appointments.filter((id)=>!state.appointments[id].interview).length
  const updatedDayObj = {...currentDay, spots};
  const updatedDays = [...state.days]
  updatedDays[currentDayIndex] = updatedDayObj;
  return updatedDays
}
 //CHANGING LOCAL STATE 
 
 //WITH bookInterview()
 const bookInterview = (id, interview) => {

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
   
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  //  const nameOfDay = state.day

  //  for(const day of state.days){
  //   if(day.name === nameOfDay){
  //     day.spots -= 1;
  //   }
  //  }
  
  return axios.put(`${appointmentsUrl}/${id}`, appointment)
  //  .then(()=>updateSpots(state))
    .then(()=>{
      setState((prev)=>({...prev,appointments}))
    })
    .then(()=>{
      setState((prev)=>({...prev, days:updateSpots(prev)}))
    })

  }

 //WITH cancelInterview
const cancelInterview = (id) => {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  //  const nameOfDay = state.day

  //  for(const day of state.days){
  //   if(day.name === nameOfDay){
  //     day.spots += 1;
  //   }
  //  }  

  return axios.delete(`${appointmentsUrl}/${id}`)
    .then(()=>{
      setState((prev)=>({...prev,appointments}))
    })
    .then(()=>{
      setState((prev)=>({...prev, days:updateSpots(prev)}))
    })
   
 }
 




  return {state, setDay, bookInterview, cancelInterview}
}