
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import "./CalendarComponent.css";

export default function CalendarComponent() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}


