import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';

export default function InterviewerList(props) {
  const InterviewerListItems = props.interviewers.map((interviewerItem) => {
    return (
      <InterviewerListItem
        key={interviewerItem.id}
        name={interviewerItem.name}
        avatar={interviewerItem.avatar}
        selected={interviewerItem.id === props.value}
        setInterviewer={() => props.onChange(interviewerItem.id)}
      />
    );
  });

  return (
    <div className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerListItems}</ul>
    </div>
  );
}
