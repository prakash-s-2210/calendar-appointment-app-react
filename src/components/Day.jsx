import React, {useContext, useEffect, useState, useRef} from 'react';
import dayjs from "dayjs";
import moment from 'moment/moment';
import GlobalContext from '../context/GlobalContext';
import"../css files/Calendar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faXmark } from '@fortawesome/free-solid-svg-icons'

let useClickOutside = (handler) => {
  let eventNode = useRef();
  useEffect(()=> {
      let maybeHandler = (event) => {
          if(!eventNode.current.contains(event.target)){
              handler();
          }
          };
          document.addEventListener("mousedown", maybeHandler);
          return () => {
              document.removeEventListener("mousedown", maybeHandler);
          };
      });
      return eventNode
  }
function Day({day, rowIndex}) {
  // day.js gives current date 
  const[dayEvents, setDayEvents] = useState([]);
  const [ showEvents, setShowEvents] = useState(false);
  const{setDaySelected, showEventModal, setShowEventModal, filteredEvents,viewEvents, setViewEvents, setSelectedEvent, setShowDayViewCalendar, setShowMonthViewCalendar, setDateIndex, setDefaultTitle,  monthIndex} = useContext(GlobalContext)
  const [count,setCount] = useState(null);
  useEffect(()=>{
    const events = filteredEvents.filter(evt => moment(evt.startTime).format("DD-MM-YY") === day.format("DD-MM-YY"));
    setDayEvents(events);
  }, [filteredEvents, day]);
  let eventNode = useClickOutside(()=>{
    setShowEvents(false);
    // setShowEventModal(false);
})
  function getCurrentDayClass() {
    const format = "DD-MM-YY"
    const today = dayjs().format(format);
    const currentDay = day.format(format);
    const currentMonth = dayjs(new Date(dayjs().year(), monthIndex, 1)).format("MM")
    if(today === currentDay){
      return "day-class";
    }
    else if(currentMonth !== day.format("MM")){
      return "prev-month";
    }
    else{
      return "date-calendar";
    }
  }
  
  return (
    <div className='column' 
    onClick={(e) => {
      setDaySelected(day);
      setShowEventModal(true);
      setDefaultTitle(true);
      
      e.stopPropagation();
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
        {dayEvents.map((evt,idx) => (idx < 2 &&
          <div 
          onClick={(e)=>{
            e.stopPropagation();
            setSelectedEvent(evt);
            setShowEventModal(false);
            setViewEvents(true);
          }}
          key={idx}
          className='month-event-title' style={{backgroundColor: `${evt.label}`}}>
            <input type="radio" checked style={{accentColor:`${evt.label}`}} className="radio-button" />
            <span className='event-month-time'>{evt.startTime?moment(evt.startTime).format("h:mma"):""}</span>   
            <span className='day-view-events-title'>{evt.title?evt.title:"(Notitle)"}</span>
          </div>
        ))}
        {dayEvents.length > 2 && <div className='count-events' onClick={(event)=>{
          event.stopPropagation();
          setShowEvents(!showEvents);
        }}>{dayEvents.length - 2} more</div> } 
        {showEvents && <div ref={eventNode}
          className='month-calendar-event-modal' >
            <div className='calendar-event-header'>
              <div><span className='show-event-date'>{day.format("d")}</span> {day.format("MMMM")}</div>
              <FontAwesomeIcon icon = {faXmark} onClick={(event)=>{
                setShowEvents(!showEvents);
                event.stopPropagation();
              }} className="close-event"></FontAwesomeIcon>
            </div>
            <div style={{height: "20px"}}></div>
            {dayEvents.map((evt,idx) => (
            <div style={{backgroundColor: `${evt.label}`, marginBottom:"5px"}} className="show-event-flex" onClick={()=>{
              setSelectedEvent(evt)
            }} key={idx}>
              <input type="radio" checked style={{accentColor:`${evt.label}`}}  />
              <div className='show-event-title-time'>{evt.startTime?moment(evt.startTime).format("h:mma"):""}   {evt.title?evt.title:"(No title)"}</div>
            </div>))}
          </div>
        }      
    </div>
    
  )
}

export default Day