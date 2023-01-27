import React, { useContext, useState, useEffect, useRef} from 'react'
import Modal from './Modal';
import Guid from 'guid';
import axios from 'axios';
import "../css files/EventModal.scss";
import EventCalendar from './EventCalendar';
import GlobalContext from '../context/GlobalContext';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faXmark, faClock, faBookmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
const labelsClasses = ["blue",  "gray", "green", "indigo", "red", "purple"];

let useClickOutside = (handler) => {
    let domNode = useRef();
    useEffect(()=> {
        let maybeHandler = (event) => {
            if(!domNode.current.contains(event.target)){
                handler();
            }
            };
            document.addEventListener("mousedown", maybeHandler);
            return () => {
                document.removeEventListener("mousedown", maybeHandler);
            };
        });
        return domNode
    }
    

export default function EventModal() {
    const modalRef = useRef()
    const delteConfirmationModalRef = useRef()
    const {
        savedEvents,
        startDateTime,
        endDateTime,
        setStartDateTime,
        setEndDateTime,
        setDayViewLabel,
        title,
        setTitle,
        addTime,
        setAddTime,
        eventStartTime,
        setEventStartTime,
        eventEndTime,
        setEventEndTime,
        startTimeComponent,
        setStartTimeComponent,
        endTimeComponent,
        setEndTimeComponent,
        date,
        setDate,
        setShowEventModal, 
        daySelected, 
        dispatchCallEvent, 
        selectedEvent,
        setTrackLabel ,
        showDayViewCalendar,
        showMonthViewCalendar,
        dayViewEventStartTime,
        setDayViewEventStartTime,
        dayViewEventEndTime,
        setDayViewEventEndTime,
        setTrackTitle, 
        setTrackPosition, // track position after event modal opened
        setHeight,  // track height after event modal opened
        height,
        timeSlots, // it is for getting timeSlots between 12am and 11:45pm4
        trackPosition
    } = useContext(GlobalContext);
    const [ monthViewStartTimeSlots, setMonthViewStartTimeSlots] = useState([]);
    const [ monthViewSlotsEndTime, setMonthViewSlotsEndTime] = useState([]);
    const [ timeSlotsEndTime, setTimeSlotsEndTime ] = useState([])
    const [ trackHeight, setTrackHeight ] = useState(null);
    const [ allDay, setAllDay ] = useState(false)
    const [checked, setChecked ] = useState(true)
    const [ startDateCalendar, setStartDateCalendar ] = useState(false);
    const [ endDateCalendar, setEndDateCalendar ] = useState(false);  
    const [guests,setGuests] = useState("")
    const [addLocation,setAddLocation] = useState("")
    const [addDescription, setAddDescription] = useState(
        selectedEvent ? selectedEvent.addDescription : ""
    )
    
    
    const[selectedLabel, setSelectedLabel] = useState(selectedEvent 
        ? labelsClasses.find((labelClass) => labelClass === selectedEvent.label)
        : labelsClasses[0])

    function handleSubmit(e){
        
        const calendarEvent = {
            eventId: selectedEvent ? selectedEvent.eventId :  Guid.EMPTY,
            title: title,
            addDescription: addDescription,
            startTime:moment(daySelected.format('YYYY-MM-DD') + ' ' + startDateTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DDTHH:mm:ss'),
            endTime:moment(daySelected.format('YYYY-MM-DD') + ' ' + endDateTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DDTHH:mm:ss'),
            label: selectedLabel,
            status: "Scheduled"
        };
        if(selectedEvent){
            axios.put("http://localhost:5108/api/CalendarEvents/UpdateCalendarEvent", calendarEvent, { withCredentials: true })
      .then(function(response) {
        return  dispatchCallEvent({type:"update", payload: savedEvents.map((evt) =>
        evt.eventId === response.data.eventId ? response.data : evt)})
        })
        }
        else{
            axios.post("http://localhost:5108/api/CalendarEvents/AddCalendarEvent",calendarEvent,{ withCredentials: true })
      .then(function(response){
        return dispatchCallEvent({type:"push", payload: response.data});
      })
      .catch((error)=>{
        alert("The event already exist in this time slot");
      })
            // dispatchCallEvent({type: "push", payload: calendarEvent});
        }
        setShowEventModal(false);
        setDate(true);
        setAddTime(true);
        setDayViewLabel("blue");
    }
    
    
    let domNode = useClickOutside(() => {
        setShowEventModal(false);
        setTrackTitle("(Add title)");
        setEventStartTime(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("h:mma"));
        setEventEndTime(moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("h:mma"));
        setDate(true);
        setAddTime(true);
        setStartDateCalendar(false);
        setEndDateCalendar(false);
        setStartTimeComponent(false);
        setEndTimeComponent(false);
    })
    
    useEffect(() => {
        setTrackLabel(selectedLabel)
    }, [selectedLabel])
    useEffect(()=>{
        let index =  timeSlots.findIndex((element) => element.format('h:mma') === dayViewEventStartTime);
        let slicedArray = timeSlots.slice(index);
        // setDayViewStartTimeSlots(timeSlots);
        setTimeSlotsEndTime(slicedArray);
        let a = slicedArray[4].format('h:mma')
        setDayViewEventEndTime(a);
    },[timeSlots, dayViewEventStartTime])
    useEffect(()=>{
        let index = timeSlots.findIndex((element) => element.format('h:mma') === eventStartTime);
        let slicedArray = timeSlots.slice(index);
        setMonthViewStartTimeSlots(timeSlots);
        setMonthViewSlotsEndTime(slicedArray);
        // let a = slicedArray[4].format('h:mma');
        // let b = slicedArray[4].format('HH:mm');
        // setEventEndTime(a);
        // setEndDateTime(b);
    }, [timeSlots, eventStartTime])
    
  return (
    
    <div className='event-modal-container'>
        <div className='event-modal' ref={domNode}>
        <Modal ref = {modalRef}>
            <div className='modal-flex'>
              <div className='modal-text'>Discard unsaved changes?</div> 
              <div className='modal-button-flex'>
                <button className='modal-button' style={{backgroundColor:"blue"}} onClick={()=>{
                    modalRef.current.close();
                }}>Cancel</button>
                <button className='modal-button'style={{backgroundColor:"red"}} onClick={()=>{
                    setShowEventModal(false);
                    modalRef.current.close();
                }}>Discard</button>
              </div>
            </div>
        </Modal>
            <header className='event-modal-header'>
                {/* <FontAwesomeIcon icon ={faGripLines} className="drag-handle"></FontAwesomeIcon> */}
                <div>
                    {
                    selectedEvent &&
                    <button className="event-modal-delete"  onClick={
                        () => {
                            delteConfirmationModalRef.current.open();
                        axios.delete(`http://localhost:5108/api/CalendarEvents/DeleteCalendarEvent/${selectedEvent.eventId}`, { withCredentials: true })
                        .then(function(response){
                        return dispatchCallEvent({type:"delete", payload:savedEvents.filter(evt => evt.eventId !== response.data)})
                        })
                        .catch(err => {
                             
                          });
                        // dispatchCallEvent({type:"delete", payload: selectedEvent.id});
                        setShowEventModal(false);
                        }}>
                        <FontAwesomeIcon icon ={faTrash} ></FontAwesomeIcon>
                    </button>
                    }
                    <button className="event-modal-close" onClick={() =>
                        {
                            if(selectedEvent || title !== ""){
                                modalRef.current.open();
                            }
                            else{
                                setShowEventModal(false);
                            }
                        }}
                        >
                        <FontAwesomeIcon icon ={faXmark} ></FontAwesomeIcon>
                    </button>
                </div>
            </header>
            <div className='event-modal-content' >
                <div className='event-modal-content-grid-container'>
                    <div className='eve'></div>
                    <input 
                      type="text" 
                      name="title" 
                      placeholder='Add title and time' 
                      value={title} 
                      required
                      className='event-modal-input-field'
                      onChange={(e) =>{ 
                        setTitle(e.target.value);
                      }
                    } 
                    />
                </div>
                <div className='event-scheduling-detail'>
                    <FontAwesomeIcon icon ={faClock} className="schedule-icon"></FontAwesomeIcon>
                    <div className='event-time'>       
                        <p className='event-modal-selected-date'>
                        <span className="start-date" onClick={() => {
                            setStartDateCalendar(true);
                            setEndDateCalendar(false);
                            setAllDay(true);
                            setStartTimeComponent(false);
                            setEndTimeComponent(false);
                        }}>{date && daySelected.format("dddd, MMMM DD")}
                           {startDateCalendar && <EventCalendar  startDate = {startDateCalendar} endDate = {endDateCalendar}/>}
                        </span>
                        <span>{date && " - "}</span>  
                        <span className="end-date" onClick={() => {
                            setEndDateCalendar(true);
                            setStartDateCalendar(false);
                            setAllDay(true);
                            setStartTimeComponent(false);
                            setEndTimeComponent(false);
                        }}>{date &&  daySelected.format("dddd, MMMM DD")}
                            {endDateCalendar && <EventCalendar  startDate = {startDateCalendar} endDate = {endDateCalendar}/>}
                        </span>
                        {!date && <span className='start-date' onClick={()=>{
                            setStartDateCalendar(!startDateCalendar);
                            setStartTimeComponent(false);
                            setEndTimeComponent(false);
                        }}>{!date && daySelected.format("dddd, MMMM DD")}</span>}
                        {showMonthViewCalendar && !date && <span className='start-time'  onClick={() => {
                            setStartTimeComponent(!startTimeComponent);
                            setEndTimeComponent(false);
                            setStartDateCalendar(false);
                            setEndDateCalendar(false);
                            setAddTime(false);
                            }}>{!date && eventStartTime}
                            {startTimeComponent && 
                            <div className='start-time-container'>
                            {monthViewStartTimeSlots && monthViewStartTimeSlots.map((time, index) => (
                            <div key ={index} className="start-time-content" onClick={() => {
                                setEventStartTime(time.format('h:mma'));
                                setDayViewEventStartTime(time.format('h:mma'));
                                setStartDateTime(time.format('HH:mm'));
                                // setStartDateTime(time);
                            }}>{time.format('h:mma')}</div> 
                            ))}
                            </div>}
                        </span>}
                        {showDayViewCalendar && <span className='start-time'  onClick={() => {
                            setStartTimeComponent(!startTimeComponent);
                            setEndTimeComponent(false);
                            setStartDateCalendar(false);
                            setEndDateCalendar(false);
                            setTrackTitle(title);
                            }}>{!date && dayViewEventStartTime}
                            {startTimeComponent && 
                            <div className='start-time-container'>
                            {timeSlots && timeSlots.map((time, index) => (
                            <div key ={index} className="start-time-content" onClick={() => {
                                setDayViewEventStartTime(time.format('h:mma'));
                                let a = timeSlots[4].format('h:mma')
                                setDayViewEventEndTime(a)   
                                let b = index*10;
                                let c = b+6;                          
                                setTrackPosition(c);
                                setHeight(40);
                                setTrackHeight(index);
                                setStartDateTime(time.format('HH:mm'))
                            }}>{time.format('h:mma')}</div> 
                            ))}
                            </div>}
                        </span>}
                        <span>{!date && "-"}</span>
                        
                        {showMonthViewCalendar &&<span className='end-time'onClick={()=>{
                            setEndTimeComponent(!endTimeComponent);
                            setStartTimeComponent(false)
                            setEndDateCalendar(false);
                            setStartDateCalendar(false);
                            }}>{!date && eventEndTime}
                            {endTimeComponent && 
                            <div className='end-time-container'>
                            {monthViewSlotsEndTime && monthViewSlotsEndTime.map((time, index) => (
                            <div key ={index} className="end-time-content" onClick={() => {
                                setEventEndTime(time.format('h:mma'));
                                setDayViewEventEndTime(time.format('h:mma'));
                                setEndTimeComponent(false);
                                setEndDateTime(time.format('HH:mm'));
                                // setEndDateTime(time)
                            }}>{time.format('hh:mm')}</div> 
                            ))}
                            </div>}
                        </span>}
                        {showDayViewCalendar &&<span className='end-time'onClick={()=>{
                            setEndTimeComponent(!endTimeComponent);
                            setStartTimeComponent(false)
                            setEndDateCalendar(false);
                            setStartDateCalendar(false);
                            setTrackTitle(title);
                            }}>{!date && dayViewEventEndTime}
                            {endTimeComponent && 
                            <div className='end-time-container'>
                            {timeSlotsEndTime && timeSlotsEndTime.map((time, index) => (
                            <div key ={index} className="end-time-content" onClick={() => {
                                setDayViewEventEndTime(time && time.format('h:mma'));
                                let value = index * 10;                  
                                setHeight(value);
                                setEndDateTime(time.format('HH:mm'))
                            }}>{time.format('h:mma')}</div> 
                            ))}
                            </div>}
                        </span>}
                        </p><br />
                        {addTime &&<button className='add-time' onClick={() => {
                            setDate(false);
                            setAddTime(!setAddTime);
                            setChecked(false);
                            setAllDay(true);
                            setStartDateCalendar(false);
                            setEndDateCalendar(false);
                        }}>Add time</button>}
                    </div>
                </div>       
                {allDay && <div className='all-day-flex'>
                    <div className='all-day-div'></div>
                    <input type="checkbox"  className="add-day-checkbox" checked = {checked} style={{accentColor: "blue"}} 
                    onChange={()=> 
                        {
                        setDate(!date);    
                        setChecked(!checked);
                        checked && setStartTimeComponent(false);
                        checked && setEndTimeComponent(false)
                        }
                    }
                    />
                    <span className='all-day'>All day</span>
                </div>}
                <div className='add-description-flex' style={{marginBottom:"10px"}}>
                    <i class="material-symbols-outlined" >notes</i>
                    <input 
                      type="text" 
                      name="add description" 
                      placeholder='Add description' 
                      value={addDescription} 
                      required
                      className='add-description-input-field'
                      onChange={(e) => setAddDescription(e.target.value)} 
                    />
                </div>
                
               
                <div className='add-label-flex'>
                    <FontAwesomeIcon icon={faBookmark} className="add-bookmark-icon"></FontAwesomeIcon>
                    <div className='label-flex-style' >
                        {labelsClasses && labelsClasses.map((labelClass, i) => (
                            <span key={i} className="label-style" style={{backgroundColor:`${labelClass}`, marginRight:"10px"}} onClick={()=>
                            {setSelectedLabel(labelClass)
                                setDayViewLabel(labelClass)
                            }}>
                                {selectedLabel===labelClass &&<FontAwesomeIcon icon={faCheck} className="check"></FontAwesomeIcon>}
                            </span>
                        ))}
                    </div>
                </div>
                <footer className='save-event'>
                    <button type='submit' className='save' onClick={handleSubmit}>Save</button>
                </footer>
            </div>
        </div>
    </div>
  )
}






































{/* <div className='event-details'>
                        <div className='event'>Event</div>
                        <div>Out of office</div>
                        <div>Working location  <span  className='working-location'>New</span></div>
                        <div>Task</div>
                        <div>Reminder</div>
                    </div>
                    <div className='find-time-flex'>
                    <div className='find-time'></div>
                    <div className='find-a-time'>Find a time</div>
                </div>
                
            <div className='google-video-meet' >
                <img src="https://ssl.gstatic.com/calendar/images/conferenceproviders/logo_meet_2020q4_192px.svg" alt="" className='google-video-meeting'/>
                <span className='add-google-video-meet'>Add Google Video Meet Conferencing</span>
            </div>
            <div className='add-location-flex' >
                <FontAwesomeIcon icon = {faLocationDot} className="add-location"></FontAwesomeIcon>
                <input 
                  type="text" 
                  name="add location" 
                  placeholder='Add location' 
                  value={addLocation} 
                  required
                  className='add-location-input-field'
                  onChange={(e) => setAddLocation(e.target.value)} 
                />
            </div> */}

            // {(showDescription) &&<div className='add-description-flex' onClick={()=>{setShowDescriptionAttachment(!showDescriptionAttachment)
            //     setShowDescription(!showDescription)}}>
            //         <i class="material-symbols-outlined" >notes</i>
            //         <span className='add-description'><span className='description' on>Add description</span> or <span className='attachments'>attachments</span></span>
            //     </div>}
            //      {(showDescriptionAttachment) && <div className='add-description-flex'>
            //      <FontAwesomeIcon icon = {faPaperclip} className="add-description-icon"></FontAwesomeIcon>
            //      <input type="file" />
            //  </div>
            //  }

            // <div className='add-guest-flex'>
            //         <FontAwesomeIcon icon = {faUserGroup} className="user-group-icon"></FontAwesomeIcon>
            //         <input 
            //             type="text" 
            //             name="guests" 
            //             placeholder='Add guests' 
            //             value={guests} 
            //             required
            //             className='add-guests-input-field'
            //             onChange={(e) => {
            //             setGuests(e.target.value);

            //         }}
            //          onClick={()=>{setTrackTitle(title)}} 
            //         />
            //     </div>