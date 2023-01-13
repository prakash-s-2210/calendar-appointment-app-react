import React, {useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs';
import '../css files/SideBar.scss';
import GlobalContext from '../context/GlobalContext'
import { getMonth } from './Month'
import { getDate } from './Date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function SideBarCalendar(props) {
   
    const [dayViewCalendarDate, setDayViewCalendarDate] = useState(getDate());
    const[currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
    const[currentMonth, setCurrentMonth]= useState(getMonth());
    const{monthIndex, setSideBarCalendarMonth, daySelected, setDaySelected, dateIndex, showDayViewCalendar, setDateIndex, showMonthViewCalendar  }=useContext(GlobalContext);
    useEffect(() => {
        showDayViewCalendar && setDayViewCalendarDate(getDate(monthIndex, dateIndex))
    }, [dateIndex])
    useEffect(()=>{
        showMonthViewCalendar && setCurrentMonthIndex(monthIndex);
        let month = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).month();
        let year = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).year();
        showDayViewCalendar && setCurrentMonth(getMonth(month, year));
    },[monthIndex, dateIndex])
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
        const today = dayjs().format(format);
        const currentDay = day.format(format);
        const selectedDay = daySelected  &&  daySelected.format(format)
        const TrackDate = showDayViewCalendar && dayViewCalendarDate.format(format)
        if(today === currentDay){
            return "current-day";
        }
        else if(currentDay === selectedDay){
            return "selected-day";
        }
        
        else if( currentDay === TrackDate){
            return "track-day"
        }
        else{
            return "sidebar-calendar-date";
        }
    }
  return (
    <div className='side-bar-calendar-wrapper'>
        <header className='side-bar-calendar'>
            <p className='side-bar-calendar-month'>
                {dayjs(new Date(dayjs().year(), currentMonthIndex, dateIndex)).format("MMMM YYYY")}
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
                                setSideBarCalendarMonth(currentMonthIndex);
                                setDaySelected(day);
                                let selectedDayToView = day.date()
                                setDateIndex(selectedDayToView);
                            }
                        }>
                            <span className={`${currentDayStyle(day)}`}>{day.format("DD")}</span>
                        </button>
                    ))}
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}
