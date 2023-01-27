import React, { useContext, useState, useRef, useEffect }  from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from 'dayjs';
import { getDate } from "../components/Date"
import calendarIcon from '../images/calendarIcon.png'
import avatar from '../images/avatar.png'
import  "../css files/NavBar.scss";
import DropDownModal from "./DropDownModal";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faChevronRight, faChevronLeft,  faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
function NavBar(props) {
    let navigate = useNavigate();
    const {monthIndex, setMonthIndex, dateIndex, setDateIndex, showMonthViewCalendar, showDayViewCalendar, setShowDropdownModal, showDropdownModal, setDaySelected,
    isToggle, setIsToggle, setShowDayViewCalendar,setShowMonthViewCalendar} = useContext(GlobalContext);
    const [ showLogout, setShowLogout ] = useState(false);
    function handlePrevMonth() {
        showMonthViewCalendar && setMonthIndex(monthIndex - 1);
        showDayViewCalendar &&  setDateIndex(dateIndex - 1);
    }
    function handleNextMonth() {
        showMonthViewCalendar && setMonthIndex(monthIndex+1) ;
        showDayViewCalendar && setDateIndex(dateIndex+1);
    }
    function handleReset() {
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
        setDateIndex(dateIndex === dayjs().date() ? dateIndex + Math.random() : dayjs().date());
        setDaySelected(dayjs())
    }
    let dropdownRef = useRef();
  useEffect(() => {
    let handler = (event) => {
        if(!dropdownRef.current.contains(event.target))
        setShowDropdownModal(false);
      }
    document.addEventListener("mousedown", handler);
    return()=>{
        document.removeEventListener("mousedown", handler);
    }
});
    return(
        <header className="header">
            <div className="calendar-logo-wrapper">
                <img  src={calendarIcon} alt="Calendar icon " className="calendar-logo" />
                <span className="calendar-title">Calendar</span>
            </div>
            <div className="navbar-flex-wrapper">
                <div className="calendar-view-change-wrapper">
                    <FontAwesomeIcon icon={faBars} className="hamburger-icon" onClick={()=>{
                        setIsToggle(!isToggle);
                    }}></FontAwesomeIcon>
                    <p className="month-details">
                        {showMonthViewCalendar && dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).format("MMMM YYYY")}
                        {showDayViewCalendar && dayjs(new Date(dayjs().year(),monthIndex, dateIndex)).format("MMMM D YYYY") }
                    </p>
                    <div className="calendar-view-change-button">
                        <FontAwesomeIcon icon = {faChevronLeft} className="chevron-left" onClick={handlePrevMonth}></FontAwesomeIcon>
                        <span className="today" onClick={handleReset}>Today</span>
                        <FontAwesomeIcon icon = {faChevronRight} className = "chevron-right" onClick={handleNextMonth}></FontAwesomeIcon>
                    </div>
                </div>
                <div className="nav-bar-flex">
                    <button className="dropdown-container" onClick={() => {setShowDropdownModal(!showDropdownModal)}} ref={dropdownRef}>
                        <span className="dropdown-default-month">{showMonthViewCalendar && <p className="current-dropdown-name">Month</p>}{showDayViewCalendar && <p className="current-dropdown-name">Day</p>}</span>
                        <FontAwesomeIcon icon ={faChevronDown} className="caret-down"></FontAwesomeIcon>
                        {showDropdownModal && <DropDownModal />}
                    </button>
                    <div className="profile" onClick={()=>{
                        setShowLogout(!showLogout);
                    }}>
                        <img src={avatar} className="avatar" alt="avatar image" />
                        <FontAwesomeIcon icon ={faChevronDown} className="chevron-down"></FontAwesomeIcon>
                        {showLogout && 
                        <div className="profile-content">
                            <div className="profile-month"
                            onClick={ 
                                () => 
                                {
                                setShowMonthViewCalendar(true)
                                setShowDayViewCalendar(false)
                                setShowDropdownModal(false) 
                                }}>Month</div>
                            <div className="profile-day" onClick={()=>{
                                setShowDayViewCalendar(true);
                                setShowMonthViewCalendar(false);
                                setShowDropdownModal(false);
                                if(monthIndex !== dayjs().month()){
                                  setDateIndex(1);
                                }
                                getDate(dateIndex);
                            }} >Day</div>
                            <div className="logout" onClick={()=>{
                                axios.delete("http://localhost:5108/api/User/Logout", { withCredentials: true })
                                .then(function(response){
                                 if(response.status === 200){
                                     navigate('/signin')
                                 }
                           })
                            }}>Log out</div>
                        </div>}
                    </div>
                </div>
            </div>
        </header>
        
        
    );
}
export default NavBar;



































{/* <div className="input-box">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifying-glass"></FontAwesomeIcon>
                        <input type="text"  className="input-field"  placeholder="Search"/>
                    </div> */}

{/* <button type="button" class="icon-button">
                        <FontAwesomeIcon icon={faBell} ></FontAwesomeIcon>
                        <span class="icon-button__badge">2</span>
                    </button> */}