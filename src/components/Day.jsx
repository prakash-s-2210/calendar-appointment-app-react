import React from 'react';
import dayjs from "dayjs";
import moment from 'moment/moment';
import GlobalContext from '../context/GlobalContext';
import"../css files/Calendar.scss";
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
function Day({day, rowIndex}) {
  
  // day.js gives current date 
  const[dayEvents, setDayEvents] = useState([])
  const{setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent, setShowDayViewCalendar, setShowMonthViewCalendar, setDateIndex, setDefaultTitle,  dayViewEventStartTime} = useContext(GlobalContext)
  useEffect(()=>{
    const events = filteredEvents && filteredEvents.filter(evt => moment(evt.startTime).format("DD-MM-YY") === day.format("DD-MM-YY"));
    setDayEvents(events);
  }, [filteredEvents, day]);
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    ? "day-class":"date-calendar"
  }
  return (
    <div className='column' 
    onClick={() => {
      setDaySelected(day);
      setShowEventModal(true);
      setDefaultTitle(true);
    }}>
        <header className='margin'>
            {
              rowIndex===0 && (<p className='day-header'>{day.format('ddd').toUpperCase()}</p>)
            }
            <p className={` ${getCurrentDayClass()}`} onClick = {(event) => {
              event.stopPropagation();
              setShowDayViewCalendar(true);
              setShowMonthViewCalendar(false);
              let selectedDayToView = day.date();
              setDateIndex(selectedDayToView);
              setDaySelected(day);
            }}>
              {
                day.date() === 1 && day.format("MMMM DD YYYY") !== dayjs().format("MMMM DD YYYY") ? 
                <div>
                  <span>{day.format("MMM")} </span>
                  <span>{day.date()}</span>
                </div>: 
                day.format("DD")
              }
            </p>
        </header> 
        {/* {selectedEventTitle &&  
        <div style={{backgroundColor:`${trackLabel}`}}>
day
        </div>
        } */}
        {dayEvents.map((evt,idx) => ( 
          <div 
          onClick={()=>{
            setSelectedEvent(evt)
          }}
          key={idx}
          className='month-event-title' style={{backgroundColor: `${evt.label}`}}>
            <input type="radio" checked style={{accentColor:`${evt.label}`}}  />
            {evt.startTime?moment(evt.startTime).format("h:mma"):""}   {evt.title?evt.title:"(No title)"}
          </div>
        ))}
    </div>
  )
}

export default Day