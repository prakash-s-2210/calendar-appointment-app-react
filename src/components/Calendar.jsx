import React from "react";
import Day from "./Day";
import"../css files/Calendar.scss"
function Calendar({ month }) {
  return (
    <div className="row"> 
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, index) => (
            <Day day={day} key={index} rowIndex={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
export default Calendar;