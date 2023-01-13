import React, {useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {getTimeSlotsDayView} from "../components/TimeSLotsDayView";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import GlobalContext from '../context/GlobalContext';
import CurrentTime from '../components/CurrentTime';
import "../css files/DayViewCalendar.scss"
import DayViewTimeSlot from './DayViewTimeSlot';
import moment from 'moment/moment';

export default function DayViewCalendar({date}) {
  const { 
    dayViewLabel,
    height,
    showEventModal,
    setSelectedEvent, 
    selectedEvent,
    dayViewEventStartTime,
    dayViewEventEndTime,
    trackTitle,
    trackPosition,
    filteredEvents,
    timeSlots,
    setShowEventModal
   } = useContext(GlobalContext);
   const [dayViewTimeSlots, setDayViewTimeSlots ] = useState([]);
   const [ dayEvents, setDayEvents ] = useState()
   useEffect(() => {
      let array =  getTimeSlotsDayView('1:00 AM', '11:00 PM');
      array.push(" ")
      setDayViewTimeSlots(array);
  }, [])
   useEffect(()=>{
      const events = filteredEvents.filter(evt => moment(evt.startTime).format("DD-MM-YY") === date.format("DD-MM-YY")
    );
    // console.log(events)
    setDayEvents(events);
  }, [filteredEvents, date]);
  function position(startTime){
    if(startTime){
    let index = timeSlots.findIndex((element) => element.format('h:mma') === startTime);
    console.log(index)
    return index*10+40;
    }
    else {
      return 0;
    }
    
  }
  function findHeight(startTime, endTime){
    if(startTime){
    let startTimeIndex = timeSlots.findIndex((element) => element.format('h:mma') === startTime);
    let endTimeIndex = timeSlots.findIndex((element) => element.format('h:mma') === endTime);
    let difference = endTimeIndex - startTimeIndex;
    return difference*10;
    }
    else{
      return 20;
    }
  }
  function currentDayStyle(date){
    const format = "DD-MM-YY"
    const today = dayjs().format(format)
    const currentDay = date.format(format)
    if(today === currentDay){
        return "day-view-day";
    }
    else{
        return "day-style";
    }
}
  function currentDateStyle(date){
    const format = "DD-MM-YY"
    const today = dayjs().format(format)
    const currentDay = date.format(format)
    if(today === currentDay){
        return "day-view-date";
    }
    else{
        return "date-style";
    }
}
  return (
    <div className='day-view-calendar'>
      <div className='date'>
        <span className ={`${currentDateStyle(date)}`}>{date.format("D")}</span>
        <span className={`${currentDayStyle(date)}`}>{date.format("dddd")}</span>
      </div>
      <div className='day-view-calendar-date'>
        <span className='gmt'>GMT+05:30</span>
        <span className='day-view-border-seperation'></span>
        <div className='day-view-day-and-date'>
          {dayEvents && dayEvents.map((evt, idx)=>(<div className='event-container'key={idx} 
          style={{
            backgroundColor: `${evt.label}`,
            bottom:`-${position(evt.startTime?moment(evt.startTime).format("h:mma"):"")}px`,
            height:`${findHeight(moment(evt.startTime).format("h:mma"),moment(evt.endTime).format("h:mma"))}px`}} >
              <div>
                <span className='event-title'>{evt.title?evt.title:"(No title)"}</span>
                {evt.dayViewEventStartTime && <span style={{display:"block"}} className="day-view-event-time">{evt.dayViewEventStartTime} - {evt.dayViewEventEndTime}</span>}
              </div>
              <FontAwesomeIcon icon={faEllipsis} className="ellipsis" onClick={()=>{
              setSelectedEvent(evt);
              setShowEventModal(true)
            }}></FontAwesomeIcon>
          </div>))}

          { showEventModal && !selectedEvent&&
          <div className='event-box' style={{bottom:`-${trackPosition}px`,height:`${height}px`, backgroundColor: `${dayViewLabel}`}}>
            <div className ="default-day-view-event-template">
              <span>{trackTitle}</span>
              <span style={{display:"block"}}>{dayViewEventStartTime} - {dayViewEventEndTime}</span>
            </div>        
          </div> } 
          <CurrentTime />   
        </div>
      </div>
      {dayViewTimeSlots.map((timeSlot, index)=>(
        <DayViewTimeSlot date = {date} timeSlot={timeSlot} index = {index} />))}      
  </div>
    
  )
}

// timeSlot-1:15

// const events = [
//   {
//     startTime: '12 AM',
//     endTime: '123123'
//   }
// ]
