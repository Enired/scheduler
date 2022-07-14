import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

const Form = (props) => {


  const [student, setStudent ] = useState(props.student || "") //String
  const [interviewer, setInterviewer] = useState(props.interviewer || null) //Number
  const interviewers = props.interviewers //Array
  const onSave = props.onSave;
  const onCancel = props.onCancel

  const reset = () =>{
    setStudent('');
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  return(
    <main className="appointment__car appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event)=>{event.preventDefault()}}>
          <input 
          type="text" 
          name="name" 
          className="appointment__create-input text--semibold" 
          placeholder="Enter Student Name"
          value = {student}
          onChange = {(event)=>{setStudent(event.target.value)}}
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__Actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form;