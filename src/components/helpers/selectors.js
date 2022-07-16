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

export function getInterview(state, interview){
   if(!interview){
    return null
   }
   const interviewerId = interview.interviewer //Returns an id number
   const student = interview.student
   const interviewer = state.interviewers[interviewerId] //Return Object

   //Assemble the object to return
   const specificInterview = {student, interviewer}

   return specificInterview

}

export function getInterviewersForDay(state, day){

  const stateDays = state.days
  const stateInterviewers = state.interviewers

  if(!stateInterviewers){
    return []
  }

  if(stateDays.length === 0){
    return []
  }

  for(const stateDay of stateDays){
    if(day === stateDay.name){
      const interviewerObjs = stateDay.interviewers.map((id)=>stateInterviewers[id])
      return interviewerObjs
    }
  }

  return []
}