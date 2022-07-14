import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

const DayListItem = function(props) {

  const dayClass = classNames('day-list__item', {'day-list__item--selected':props.selected, 'day-list__item--full': props.spots===0})

  const formatSpots = (numberOfSpots) => {
    if(numberOfSpots === 0){
      return `no spots remaining`
    }
    else if(numberOfSpots === 1){
      return `${numberOfSpots} spot remaining`

    }
    return `${numberOfSpots} spots remaining`
  }

  return(


    <li onClick={props.onChange} className={dayClass}>
      <h2  className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

export default DayListItem