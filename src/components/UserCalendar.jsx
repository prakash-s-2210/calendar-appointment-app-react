import React, {useState, useContext, useEffect} from 'react';
import dayjs from 'dayjs';
import EventModal from './EventModal';
import axios from 'axios'; 
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import { getMonth } from './Month';
import { getDate } from "./Date";
import { AxiosResponse, AxiosError } from 'axios'
import Calendar from "./Calendar";
import DayViewCalendar from './DayViewCalendar';
import GlobalContext from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import "../css files/Calendar.scss"
import ViewEvents from "../components/ViewEvents";

export default function UserCalendar() {
    let navigate = useNavigate();
    const getCalendarEvents = async()=>{
      try{
        console.log("before authentication")
        const response =await  axios.get("http://localhost:5108/api/CalendarEvents/GetCalendarEvents", { withCredentials: true });
        
            response.data.map((event)=>{
              dispatchCallEvent({type:"get", payload: event});
              console.log("after success authentication")
            })
      }
      catch(err)
      {
        if(err.response.status === 400)
        {
          console.log("failed before navifate authentication")
          navigate('/signin')
          console.log("failed after navifate authentication")
        }
      }
    }
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const [currentDate, setCurrentDate] = useState(getDate())
    const { monthIndex, showEventModal,viewEvents, showDayViewCalendar, showMonthViewCalendar, dateIndex, dispatchCallEvent } = useContext(GlobalContext)
    useEffect(()=>{
      getCalendarEvents();
    
    },[])
    useEffect(() => {
        showMonthViewCalendar && setCurrentMonth(getMonth(monthIndex, dayjs().year()));
        showDayViewCalendar && setCurrentDate(getDate(monthIndex, dateIndex));
        let month = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).month();
        let year = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).year();
        showDayViewCalendar && setCurrentMonth(getMonth(month, year));
    } , [monthIndex, dateIndex])
    
  return (
    <div>
        {viewEvents && <ViewEvents/>}
        {showEventModal && <EventModal />}
        <NavBar date = {currentDate}/>
        <div className='main-container'>
          <SideBar />    
          { showMonthViewCalendar && <Calendar month = {currentMonth} />}
          { showDayViewCalendar && <DayViewCalendar date= {currentDate}/>}
        </div>
    </div>
  )
}
