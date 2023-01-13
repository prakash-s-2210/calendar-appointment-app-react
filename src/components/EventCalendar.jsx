import React, {useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import "../css files/EventModal.scss"
import GlobalContext from '../context/GlobalContext'
import { getMonth } from './Month'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function EventCalendar(props) {
    const[currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
    const[currentMonth, setCurrentMonth]= useState(getMonth());
    const{ daySelected, setDaySelected  }=useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIndex, dayjs().year()));
    },[currentMonthIndex]);
    function handlePrevMonth() {
        setCurrentMonthIndex(currentMonthIndex-1);
    }
    function handleNextMonth() {
        setCurrentMonthIndex(currentMonthIndex+1);
    }
    function currentDayStyle(day){
        const format = "DD-MM-YY"
        const today = dayjs().format(format)
        const currentDay = day.format(format)
        const selectedDay = daySelected  &&  daySelected.format(format)
        if(today === currentDay){
            return "current-day";
        }
        else if(currentDay === selectedDay){
            return "selected-day";
        }
        else{
            return "sidebar-calendar-date";
        }
    }
    function calendarStyle() {
        if(props.startDate === true)
        {
            return "start-date-container"
        }
        else if(props.endDate === true)
        {
            return "end-date-container"
        }
        else{
            return ""
        }
    }
  return (
    <div className = {`${calendarStyle()}`}>
        <header className='side-bar-calendar'>
            <p className='side-bar-calendar-month'>
                {dayjs(new Date(dayjs().year(), currentMonthIndex, dayjs().date())).format("MMMM YYYY")}
            </p>
            <div className='side-bar-calendar-navigation'>
                <FontAwesomeIcon icon = {faChevronLeft} className="side-bar-arrow-left" onClick={handlePrevMonth} ></FontAwesomeIcon>
                <FontAwesomeIcon icon = {faChevronRight} className = "side-bar-arrow-right" onClick={handleNextMonth} ></FontAwesomeIcon>
            </div>
        </header>
        <div className='sidebar-calendar'>

            {/* currentMonth[0] - it is the first row of the calendar */}

            {currentMonth[0].map((day, index)=>(
                <span key={index} className="sidebar-calendar-day">
                    {day.format("dd").charAt(0)}
                </span>
            ))}
            {currentMonth.map((row, rowIndex)=>(
                <React.Fragment key={rowIndex}>
                    {row.map((day, index)=>(
                        <button key={index} className= "side-bar-calendar-date"  onClick={
                            ()=>{
                                setDaySelected(day);
                                // setCurrentMonthIndex(currentMonthIndex);   
                            }
                        }>
                            <span className={`${currentDayStyle(day)}`}>{day.format("D")}</span>
                        </button>
                    ))}
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}
