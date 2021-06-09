import React from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <h1>{props.time}</h1>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  );
};
