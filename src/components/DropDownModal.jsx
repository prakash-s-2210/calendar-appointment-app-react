import React, {  useRef, useEffect, useContext} from 'react';
import GlobalContext from '../context/GlobalContext';
import { getDate } from "../components/Date"
import dayjs from 'dayjs';
import "../css files/NavBar.scss";

export default function DropDownModal() {
  const {setShowDropdownModal, showDropdownModal, setShowMonthViewCalendar, setShowDayViewCalendar, setDateIndex, dateIndex, monthIndex} = useContext(GlobalContext);
  
  
  return (
      <div className='drop-down-container'  >
          <div className='dropdown-flex' onClick = {
            () => {
            setShowDayViewCalendar(true);
            setShowMonthViewCalendar(false);
            setShowDropdownModal(false);
            if(monthIndex !== dayjs().month()){
              setDateIndex(1);
            }
            getDate(dateIndex);
            }
            }>
            <div className='calendar-type-name'>Day</div>
            <div className='calendar-type-symbol'>D</div>
          </div>
          <div className='dropdown-flex'
          onClick={ 
            () => 
            {
            setShowMonthViewCalendar(true)
            setShowDayViewCalendar(false)
            setShowDropdownModal(false) 
            }}>
            <div className='calendar-type-name'>Month</div>
            <div className='calendar-type-symbol'>M</div>
          </div>
     
      </div>
  )
}
























































{/* <div className='dropdown-flex' onClick={
            () => {
              setShowDropdownModal(false);
            }
          }>
            <div className='calendar-type-name'>Week</div>
            <div className='calendar-type-symbol'>W</div>
          </div>


<div className='dropdown-flex'
onClick={
  () => {
    setShowDropdownModal(false);
  }
}>
  <div className='calendar-type-name'>Year</div>
  <div className='calendar-type-symbol'>Y</div>
</div>
<div className='dropdown-flex'
onClick={
  () => {
    setShowDropdownModal(false);
  }
}>
  <div className='calendar-type-name'>Schedule</div>
  <div className='calendar-type-symbol'>A</div>
</div>
<div className='dropdown-flex'
onClick={
  () => {
    setShowDropdownModal(false);
  }
}>
  <div className='calendar-type-name'>4 Days</div>
  <div className='calendar-type-symbol'>X</div>
</div> */}