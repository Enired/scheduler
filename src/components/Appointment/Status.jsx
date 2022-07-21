import React from "react";

const Status = (props) => {
  const message = props.message;


  return (
    <main className="appointment__card appointment__card--status">
      <img
        src="images/status.png"
        alt="Loading"
        className="appointment__status-image"
      />
      <h1 className="text--semi-bold">{message}</h1>
    </main>
  );
};

export default Status;