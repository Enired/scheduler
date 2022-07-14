import React from "react";

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {

  const time = props.time
  const interview = props.interview
  // const student = props.interview.student
  // const interviewer = props.interview.interviewer
  return(
    <article className="appointment">
      <Header time={time}></Header>
      {interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>}
    </article> 

  )
}

export default Appointment;