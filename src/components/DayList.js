import React from "react";
import DayListItem from "./DayListItem";

const DayList = function (props) {

  const daysArr = props.days;
  const days = daysArr.map(element => {
    return (
      <DayListItem
        key={element.id}
        name={element.name}
        spots={element.spots}
        selected={props.value === element.name}
        onChange={() => props.onChange(element.name)}
      />
    );
  });



  return (
    <ul>{days}</ul>
  );
};

export default DayList;