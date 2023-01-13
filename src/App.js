import './App.css';
import React, {useState, useContext, useEffect} from 'react';
import {Helmet} from "react-helmet";
import dayjs from 'dayjs';
import EventModal from './components/EventModal';
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import { getMonth } from './components/Month';
import { getDate } from "./components/Date"
import Calendar from "./components/Calendar";
import DayViewCalendar from './components/DayViewCalendar';
import GlobalContext from './context/GlobalContext';
import "./css files/Calendar.scss"
function App() {
  // const modalRef = useRef()
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const [currentDate, setCurrentDate] = useState(getDate())
  const { monthIndex, showEventModal, showDayViewCalendar, showMonthViewCalendar, dateIndex } = useContext(GlobalContext)
  useEffect(() => {
    showMonthViewCalendar && setCurrentMonth(getMonth(monthIndex, dayjs().year()));
    showDayViewCalendar && setCurrentDate(getDate(monthIndex, dateIndex));
    let month = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).month();
    let year = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).year();
    showDayViewCalendar && setCurrentMonth(getMonth(month, year));
  } , [monthIndex, dateIndex])
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calendar appointment app</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div>
        {showEventModal && <EventModal />}
        <NavBar date = {currentDate}/>
        <div className='main-container'>
          <SideBar />    
          { showMonthViewCalendar && <Calendar month = {currentMonth} />}
          { showDayViewCalendar && <DayViewCalendar date= {currentDate}/>}
        </div>
      </div>   
    </React.Fragment>
  );
}

export default App;
