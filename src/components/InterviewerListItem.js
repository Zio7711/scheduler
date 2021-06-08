import React from 'react';
import './InterviewerListItem.scss';
const classNames = require('classnames');

export default function DayListItem(props) {
  let interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  let imgClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
