import React from "react";

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const EDIT = "EDIT"
  const CONFIRM = "CONFIRM"
  const ERR_DEL = "ERR_DEL"
  const ERR_SAV = "ERR_SAV"
 

  const time = props.time
  const interview = props.interview
  const id = props.id
  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

    //WITH save()
    const save = (name, interviewer) => {
      // if(!name || !interviewer){
      //   return
      // }

      const someInterview = {
        student: name,
        interviewer
      };

      transition(SAVING,true)

      props.bookInterview(id, someInterview)
      .then(()=>transition(SHOW))
      .catch((err)=>transition(ERR_SAV, true))
 
    }

    const deleteInterview = () => {
      transition(DELETING, true)
      props.cancelInterview(id)
      .then(()=>transition(EMPTY))
      .catch((err)=>transition(ERR_DEL, true))
    
    }

    const confirm = () => {
      transition(CONFIRM)
    }

    const transitionCreate = () => {
      transition(CREATE)
    }

  return(

    
    <article className="appointment">
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={transitionCreate}/>}

      {mode === SHOW && <Show student={interview.student} interviewer={props.interview.interviewer} onEdit={()=>transition(EDIT)} onDelete={confirm}/>}

      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>}

      {mode === SAVING && <Status message={SAVING}/>}
      
      {mode === DELETING && <Status message={DELETING}/>}
      
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteInterview} message={'Are you sure you want to delete this?'}/>}
      
      {mode === EDIT && <Form student={interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back}/>}

      {mode === ERR_SAV && <Error message={'Error Saving'} onClose={back}/>}
     
     {mode === ERR_DEL && <Error message={"Error Deleting"} onClose={back}/>}
    </article> 

  )
}

export default Appointment;