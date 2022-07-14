import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

const InterviewerList = (props) => {
  const interviewerArr = props.interviewers
  const interviewers = interviewerArr.map(e => {
    return (
      <InterviewerListItem 
      key={e.id}
      name={e.name}
      avatar={e.avatar}
      setInterviewer={()=>{props.onChange(e.id)}}
      selected = {e.id === props.value}
      />
    )
  })
  

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewers}</ul>
    </section>

  )
}

export default InterviewerList