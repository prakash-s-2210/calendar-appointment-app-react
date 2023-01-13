import React, {useState, useEffect, useReducer, useMemo} from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs';
import moment from 'moment/moment';
import axios from 'axios';
import { getTimeSlots } from '../components/TimeSlots';
function savedEventsReducer(state, {type, payload}){
  switch (type) {
    case 'get':
      return [...state,payload];
    case 'push':
      axios.post("http://localhost:5108/api/CalendarEvents/AddCalendarEvent",payload)
      .then(function(response){
        return [...state, response.data];
      })
      .catch(function (error) {
      })
    case 'update':
      axios.put("http://localhost:5108/api/CalendarEvents/UpdateCalendarEvent", payload)
      .then(function(response) {
        return state.map((evt) =>
        evt.id === response.data.id ? response.data : evt
      );
        // return response.data.map(evt => evt.id === payload.id ? payload : evt)
      })
    case 'delete':
      console.log(payload)
      axios.post("http://localhost:5108/api/CalendarEvents/DeleteCalendarEvent", payload)
      .then(function(response){
        console.log(response.data)
        return state.filter(evt => evt.id !== response.data.id)
      })
      .catch(err => {
        // Handle error
        console.log(err);
    });
    default:
      return [];
  }
}
function initEvents() {
  return [];
}
//event modal
function currentStartTime(selectedEvent) { 
  const currentTime = moment().add(moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("h:mma");
  return selectedEvent ? selectedEvent.startTime : currentTime
}
function currentEndTime(selectedEvent) {
  const currentTimePlusOneHour = moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("h:mma");
  return selectedEvent ? selectedEvent.endTime : currentTimePlusOneHour;
}
function formatStartTime(selectedEvent) { 
  const currentTime = moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("HH:mm");
  return selectedEvent ? selectedEvent.startTime : currentTime
}
function formatEndTime(selectedEvent) {
  const currentTimePlusOneHour = moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("HH:mm");
  return selectedEvent ? selectedEvent.endTime : currentTimePlusOneHour;
}
export default function ContextWrapper(props) {
  //dayView event modal
  //event modal
    const [ currentTime, setCurrentTime ] = useState(null);
    const [ dayViewLabel, setDayViewLabel ] = useState("blue"); // for day view label change
    const [ timeSlots, setTimeSlots ] = useState([]); // get the time slots from 12am to 11:45am
    const [ trackPosition, setTrackPosition ] = useState(null)
    const [ height, setHeight ] = useState(null);
    const [ trackTitle, setTrackTitle ] = useState("(Add title)")
    const [ dayViewEventStartTime, setDayViewEventStartTime ] = useState(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("h:mma"));
    const [ dayViewEventEndTime, setDayViewEventEndTime ] = useState(moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("h:mma"))
    const [ addTime, setAddTime ] = useState(true);
    const [ startTimeComponent, setStartTimeComponent] = useState(false);
    const [ endTimeComponent, setEndTimeComponent] = useState(false);
    const [ date, setDate ] = useState(true);
    const [ trackLabel, setTrackLabel ] = useState(null);
    const [ defaultTitle, setDefaultTitle ] = useState(false);
    const [ defaultTimeWithTitle, setDefaultTimeWithTitle ] = useState(false);
    const [ showDropdownModal, setShowDropdownModal] = useState(false)
    const [ showMonthViewCalendar, setShowMonthViewCalendar] = useState(true)
    const [ showDayViewCalendar, setShowDayViewCalendar] = useState(false)
    const [ monthIndex, setMonthIndex] = useState(dayjs().month())
    const [ dateIndex, setDateIndex] = useState(dayjs().date())
    const [ sideBarCalendarMonth, setSideBarCalendarMonth] = useState(null)
    const [ daySelected, setDaySelected] = useState(dayjs())
    const [ showEventModal, setShowEventModal] = useState(false)
    const [ selectedEvent, setSelectedEvent] = useState(null)
    const [ eventStartTime, setEventStartTime ] = useState(currentStartTime(selectedEvent));
    const [ eventEndTime, setEventEndTime ] = useState(currentEndTime(selectedEvent));
    const [ title, setTitle ] = useState(selectedEvent ? selectedEvent.title : "")
    const [ labels, setLabels] = useState([])
    const [ isToggle, setIsToggle ] = useState(false)
    const [ startDateTime, setStartDateTime ] = useState(formatStartTime(selectedEvent))
    const [ endDateTime, setEndDateTime ] = useState(formatEndTime(selectedEvent))
    const [ startTime, setStartTime ] = useState(selectedEvent ? selectedEvent.startTime:"")
    const [ endTime, setEndTime ] = useState(selectedEvent ? selectedEvent.endTime:"")
    const [ savedEvents, dispatchCallEvent] = useReducer(
      savedEventsReducer, 
      [], 
      initEvents
      );
      
// get request
const filteredEvents = useMemo(() => {
  return savedEvents.filter((evt)=>
     labels.filter((lbl) => lbl.checked)
     .map((lbl) => lbl.label)
     .includes(evt.label)    
  );
}, [savedEvents, labels]);
useEffect(()=>{
  axios.get("http://localhost:5108/api/CalendarEvents/GetCalendarEvents").then((data) => {
    data.data.map((event)=>{
      dispatchCallEvent({type:"get", payload: event});
  })
    });
},[])

//     useEffect(() => {
//       localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
// },[savedEvents]);
    useEffect(() => {
      setLabels((prevLabels)=>{
        return[ ...new Set(savedEvents.map((evt) => evt.label))].map(
          (label) => {
            const currentLabel = prevLabels.find(
              (lbl) => lbl.label === label
            );
            return {
              label,
              checked: currentLabel ? currentLabel : true,
            };
          }
        )
      })
},[savedEvents]); 

    useEffect(() => {
      let updateStartTime = selectedEvent && moment(selectedEvent.startTime).format("h:mma")
      let updateEndTime = selectedEvent && moment(selectedEvent.endTime).format("h:mma")
      let updateStartDateTime = selectedEvent && moment(selectedEvent.startTime).format("HH:mm")
      let updateEndDateTime = selectedEvent && moment(selectedEvent.endTime).format("HH:mm")
      selectedEvent && setEventStartTime(updateStartTime);
      selectedEvent && setEventEndTime(updateEndTime);
      selectedEvent && setStartDateTime(updateStartDateTime)
      selectedEvent && setEndDateTime(updateEndDateTime)
      setTitle(selectedEvent?selectedEvent.title:"")
    }, [showEventModal])
    useEffect(()=>{
      if(sideBarCalendarMonth !== null){
        setMonthIndex(sideBarCalendarMonth)
      }
    },[sideBarCalendarMonth])

    useEffect(()=>{
      if(!showEventModal) {
        setSelectedEvent(null);
      }
    },[showEventModal])

    function updateLabel(label) {
      setLabels(labels.map((lbl) => (lbl.label === label.label) ? label :lbl ))
    }
    useEffect(() => {
      setTimeSlots(getTimeSlots('12:00 AM', '11:45 PM'))
  }, [])
  return (
    <GlobalContext.Provider 
    value=
    {{
      //event modal
      currentTime, 
      setCurrentTime,
      dayViewLabel, // for day view label change
      setDayViewLabel, 
      timeSlots,
      setTimeSlots,
      trackPosition,
      setTrackPosition,
      height,
      setHeight,
      trackTitle,
      setTrackTitle,
      title,
      setTitle,
      dayViewEventStartTime,
      setDayViewEventStartTime,
      dayViewEventEndTime,
      setDayViewEventEndTime,
      addTime,
      setAddTime,
      eventStartTime,
      setEventStartTime,
      startTimeComponent,
      setStartTimeComponent,
      endTimeComponent,
      setEndTimeComponent,
      eventEndTime,
      setEventEndTime,
      date,
      setDate,
      monthIndex, 
      setMonthIndex,
      dateIndex,
      setDateIndex,
      sideBarCalendarMonth, 
      setSideBarCalendarMonth,
      daySelected,
      setDaySelected,
      defaultTitle, 
      setDefaultTitle,
      defaultTimeWithTitle, 
      setDefaultTimeWithTitle,
      showEventModal,
      setShowEventModal,
      selectedEvent,
      setSelectedEvent, 
      labels,
      setLabels,
      dispatchCallEvent,
      savedEvents,
      updateLabel,
      filteredEvents,
      showMonthViewCalendar,
      setShowMonthViewCalendar,
      showDayViewCalendar,
      setShowDayViewCalendar,
      showDropdownModal,
      setShowDropdownModal, 
      trackLabel,
      setTrackLabel,
      isToggle,
      setIsToggle,
      startDateTime,
      setStartDateTime,
      endDateTime,
      setEndDateTime,
      startTime,
      setStartTime,
      endTime,
      setEndTime
      }}>
        {props.children}
    </GlobalContext.Provider>
  )
}
