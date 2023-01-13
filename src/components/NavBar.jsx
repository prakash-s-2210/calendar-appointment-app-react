import React, { useContext, useState }  from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from 'dayjs';
import calendarIcon from '../images/calendarIcon.png'
import avatar from '../images/avatar.png'
import  "../css files/NavBar.scss";
import DropDownModal from "./DropDownModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faChevronRight, faChevronLeft, faMagnifyingGlass, faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
function NavBar(props) {
    
    const {monthIndex, setMonthIndex, dateIndex, setDateIndex, showMonthViewCalendar, showDayViewCalendar, setShowDropdownModal, showDropdownModal, setDaySelected,
    isToggle, setIsToggle} = useContext(GlobalContext);
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
                    <div className="input-box">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifying-glass"></FontAwesomeIcon>
                        <input type="text"  className="input-field"  placeholder="Search"/>
                    </div>
                    <button className="dropdown-container" onClick={() => {setShowDropdownModal(!showDropdownModal)}}>
                        <span className="dropdown-default-month">{showMonthViewCalendar && <p className="current-dropdown-name">Month</p>}{showDayViewCalendar && <p className="current-dropdown-name">Day</p>}</span>
                        <FontAwesomeIcon icon ={faChevronDown} className="caret-down"></FontAwesomeIcon>
                    </button>
                    <button type="button" class="icon-button">
                        <FontAwesomeIcon icon={faBell} ></FontAwesomeIcon>
                        <span class="icon-button__badge">2</span>
                    </button>
                    <div className="profile">
                        <img src={avatar} className="avatar" alt="avatar image" />
                        <FontAwesomeIcon icon ={faChevronDown} className="chevron-down"></FontAwesomeIcon>
                    </div>
                    {showDropdownModal && <DropDownModal />}
                </div>
            </div>
        </header>
        
        
    );
}
export default NavBar;
