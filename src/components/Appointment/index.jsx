import React from "react";

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"

  const time = props.time
  const interview = props.interview
  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);


  // const student = props.interview.student
  // const interviewer = props.interview.interviewer
  return(

    
    <article className="appointment">
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)}/>}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back}></Form>}
    </article> 

  )
}

export default Appointment;