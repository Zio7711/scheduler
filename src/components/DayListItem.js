import React from 'react';
import './DayListItem.scss';
const classNames = require('classnames');

export default function DayListItem(props) {
  //assign class for different conditions
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  //function to display spot information in a semantic way
  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining';
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  };

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
