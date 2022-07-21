import React from "react";
import Button from "components/Button";

const Confirm = (props) => {

  const message = props.message;
  const onConfirm = props.onConfirm;
  const onCancel = props.onCancel;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semibold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={() => onCancel()}>Cancel</Button>
        <Button danger onClick={() => onConfirm()}>Confirm</Button>
      </section>
    </main>
  );
};

export default Confirm;