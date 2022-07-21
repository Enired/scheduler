import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

const Form = (props) => {

  const [student, setStudent ] = useState(props.student || "") //String
  const [interviewer, setInterviewer] = useState(props.interviewer || null) //Number
  const [error, setError] = useState("")
  const interviewers = props.interviewers //Array
  const onSave = props.onSave;
  const onCancel = props.onCancel

  const reset = () =>{
    setStudent('');
    setError('');
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    onCancel();
  }

  const validate = () => {
    if(student === ""){
      setError('Student name cannot be blank');
      return;
    }
    if(interviewer === null) {
      setError('Please select an interviewer');
      return;
    }
    setError('');

    onSave(student, interviewer)
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event)=>{event.preventDefault()}}>
          <input 
          type="text" 
          name="name" 
          className="appointment__create-input text--semibold" 
          placeholder="Enter Student Name"
          value = {student}
          onChange = {(event)=>{setStudent(event.target.value);}}
          data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__Actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={()=>validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form;