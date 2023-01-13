import React, {  useRef, useEffect, useContext} from 'react';
import GlobalContext from '../context/GlobalContext';
import { getDate } from "../components/Date"
import dayjs from 'dayjs';
import "../css files/Calendar.scss";

export default function DropDownModal() {
  const {setShowDropdownModal, showDropdownModal, setShowMonthViewCalendar, setShowDayViewCalendar, setDateIndex, dateIndex, monthIndex} = useContext(GlobalContext);
  
  let dropdownRef = useRef();
  useEffect(() => {
    let handler = (event) => {
        if(!dropdownRef.current.contains(event.target))
        setShowDropdownModal(!showDropdownModal);
      }
    document.addEventListener("mousedown", handler);
    return()=>{
        document.removeEventListener("mousedown", handler);
    }
});
  return (
      <div className='drop-down-container' ref={dropdownRef} >
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
          <div className='dropdown-flex' onClick={
            () => {
              setShowDropdownModal(false);
            }
          }>
            <div className='calendar-type-name'>Week</div>
            <div className='calendar-type-symbol'>W</div>
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
          </div>
      </div>
  )
}
