import React from "react";

const Show = (props) => {

  const student = props.student;
  const interviewer = props.interviewer;
  const interviewerName = interviewer.name;
  const onEdit = props.onEdit;
  const onDelete = props.onDelete;


  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">
          {student}
        </h2>
        <section className="interviewer">
          <h4 className="text--light">
            Interviewer
          </h4>
          <h3 className="text--regular">
            {interviewerName}
          </h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            src="images/edit.png"
            alt="Edit"
            className="appointment__actions-button"
            onClick={onEdit}
          />

          <img
            src="images/trash.png"
            alt="Delete"
            className="appointment__actions-button"
            onClick={() => onDelete()}
          />

        </section>
      </section>
    </main>
  );
};

export default Show;