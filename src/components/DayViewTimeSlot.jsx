
import "../css files/DayViewCalendar.scss"
import React, {useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
// import {getTimeSlotsDayView} from "../components/TimeSLotsDayView";
import GlobalContext from '../context/GlobalContext';
import "../css files/DayViewCalendar.scss"

export default function DayViewTimeSlot({timeSlot, index, date}) {
        const { 
          height,
          setHeight,
          setShowEventModal, 
          setAddTime, 
          setDate,
          setDayViewEventStartTime,
          setDayViewEventEndTime,
          setTrackPosition,
          setDaySelected,
          setStartDateTime, 
          startDateTime,
          endDateTime,
          setEndDateTime
         } = useContext(GlobalContext);
      
        //  const [timeSlots, setTimeSlots ] = useState([])
        //  useEffect(() => {
        //     let array =  getTimeSlotsDayView('1:00 AM', '11:00 PM');
        //     array.push(" ")
        //     setTimeSlots(array);
        // }, [])   
        
  return (
    <div key={index} className='day-view-calendar-date'>
    <span className='time'>{timeSlot.data}{" "}{timeSlot.am}</span>
    <span className='day-view-event-border-seperation'></span>
    <div className='day-view-event' onClick={(event)=>{
      setShowEventModal(true);
      setAddTime(false);
      setDate(false);
      setDaySelected(date);
      var particularDivHeight = event.nativeEvent.offsetY;
      var unwantedHeightFromParentDiv = (index * 40 );
      if(particularDivHeight<=10)
      {
        var data = timeSlot.data - 1;
        var startTime = timeSlot.startTime - 1;
        if(data === 0) data =12;
        setDayViewEventStartTime(`${data}:00${timeSlot.am}`)
        setDayViewEventEndTime( `${timeSlot.data}:00${timeSlot.am}`)
        setStartDateTime(startTime);
        setEndDateTime(timeSlot.startTime);
        particularDivHeight = 0;         
      }
      else if(particularDivHeight>= 10 && particularDivHeight<=20){
        var data = timeSlot.data - 1;
        var startTime = timeSlot.startTime - 1;
        var a = `${startTime}:15`;
        if(data === 0) data =12;
        setDayViewEventStartTime(`${data}:15${timeSlot.am}`)
        setDayViewEventEndTime(`${timeSlot.data}:15${timeSlot.am}`)
        setStartDateTime(a);
        setEndDateTime(`${timeSlot.startTime}:15`);
        particularDivHeight = 10;
      }
      else if(particularDivHeight>= 20 && particularDivHeight<=30)
      {
        var data = timeSlot.data - 1;
        var startTime = timeSlot.startTime - 1;
        if(data === 0) data =12;
        setDayViewEventStartTime(`${data}:30${timeSlot.am}`)
        setDayViewEventEndTime(`${timeSlot.data}:30${timeSlot.am}`)
        setStartDateTime(`${startTime}:30`);
        setEndDateTime(`${timeSlot.startTime}:30`)
        particularDivHeight = 20
      }
      else {
        var data = timeSlot.data - 1;
        var startTime = timeSlot.startTime - 1;
        if(data === 0) data =12;
        // setDefaultTimeSlots(`${data}:45 - ${timeSlot.data}:45${timeSlot.am}`)
        setDayViewEventStartTime(`${data}:45${timeSlot.am}`);
        setDayViewEventEndTime(`${timeSlot.data}:45${timeSlot.am}`);
        setStartDateTime(`${startTime}:45`);
        setEndDateTime(`${timeSlot.startTime}:45`)
        particularDivHeight = 30
      }
      var particularDivHeightFromParentDiv = unwantedHeightFromParentDiv+particularDivHeight;
      setTrackPosition(`${particularDivHeightFromParentDiv+6}`);
      setHeight(40);
    }}></div>
  </div>
  )
}
