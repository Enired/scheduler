export function getAppointmentsForDay(state, day){
  const stateDays = state.days //Array of objects
  const stateAppointments = state.appointments
  if(!stateAppointments){
    return []
  }
  if(stateDays.length === 0){
    return []
  }

  for(const stateDay of stateDays){
    if(day === stateDay.name){
      const apptObjs = stateDay.appointments.map((id)=>stateAppointments[id])
      return apptObjs
    }
  }
  return [];
}