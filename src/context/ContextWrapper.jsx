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
      return [...state, payload];
    case 'update':
      return [...payload]
    case 'delete':
      return [...payload]
    default:
      return state;
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
function formatStartTime(selectedEvent, showMonthViewCalendar) { 
  const currentTime = moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("HH:mm");
  return selectedEvent ? selectedEvent.startTime : showMonthViewCalendar && "currentTime"
}
function formatEndTime(selectedEvent) {
  const currentTimePlusOneHour = moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("HH:mm");
  return selectedEvent ? selectedEvent.endTime : currentTimePlusOneHour;
}
export default function ContextWrapper(props) {
  //dayView event modal
  //event modal
    const [ viewEvents, setViewEvents ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(null); // setting a day view current time
    const [ dayViewLabel, setDayViewLabel ] = useState("blue"); // for day view label change
    const [ timeSlots, setTimeSlots ] = useState([]); // get the time slots from 12am to 11:45am
    const [ trackPosition, setTrackPosition ] = useState(null)
    const [ height, setHeight ] = useState(null);
    const [ trackTitle, setTrackTitle ] = useState("(Add title)")
    const [ dayViewEventStartTime, setDayViewEventStartTime ] = useState(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("h:mma")); // dayview event start time
    const [ dayViewEventEndTime, setDayViewEventEndTime ] = useState(moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("h:mma")) // day view event end time
    const [ addTime, setAddTime ] = useState(true); // add time div hide
    const [ startTimeComponent, setStartTimeComponent] = useState(false); // start time drop down
    const [ endTimeComponent, setEndTimeComponent] = useState(false); // end time dropdown
    const [ date, setDate ] = useState(true); // change calendar and time component
    const [ trackLabel, setTrackLabel ] = useState(null); 
    const [ defaultTitle, setDefaultTitle ] = useState(false);
    const [ defaultTimeWithTitle, setDefaultTimeWithTitle ] = useState(false);
    const [ showDropdownModal, setShowDropdownModal] = useState(false); // show dropdown modal
    const [ showMonthViewCalendar, setShowMonthViewCalendar] = useState(true) // show month view calendar component
    const [ showDayViewCalendar, setShowDayViewCalendar] = useState(false)  // show day view calendar
    const [ monthIndex, setMonthIndex] = useState(dayjs().month()) // month index control the monthly calendar  change
    const [ dateIndex, setDateIndex] = useState(dayjs().date()) // date index control the day view calendar change
    const [ sideBarCalendarMonth, setSideBarCalendarMonth] = useState(null) // side bar calendar month 
    const [ daySelected, setDaySelected] = useState(dayjs()) // select the day for event
    const [ showEventModal, setShowEventModal] = useState(false) // showing event modal
    const [ selectedEvent, setSelectedEvent] = useState(null) //selected event for updating
    const [ eventStartTime, setEventStartTime ] = useState(currentStartTime(selectedEvent)); //month view start time
    const [ eventEndTime, setEventEndTime ] = useState(currentEndTime(selectedEvent)); // month view end time
    const [ title, setTitle ] = useState(selectedEvent ? selectedEvent.title : "") // title for event
    const [ labels, setLabels] = useState([]) //labels for event
    const [ isToggle, setIsToggle ] = useState(false) // side bar toggle 
    const [ startDateTime, setStartDateTime ] = useState(formatStartTime(selectedEvent, showMonthViewCalendar)) // for setting the event start time in HH:MM format
    const [ endDateTime, setEndDateTime ] = useState(formatEndTime(selectedEvent)) // for setting the event end time in HH:MM format
    const [ startTime, setStartTime ] = useState(selectedEvent ? selectedEvent.startTime:"") // for setting the start time
    const [ endTime, setEndTime ] = useState(selectedEvent ? selectedEvent.endTime:"") // for setting the end time
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
// useEffect(()=>{
//   axios.get("http://localhost:5108/api/CalendarEvents/GetCalendarEvents", { withCredentials: true }).then((data) => {
//     data.data.map((event)=>{
//       dispatchCallEvent({type:"get", payload: event});
//   })
//     });
// },[])
;
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
      showMonthViewCalendar && selectedEvent ? setEventStartTime(updateStartTime):setEventStartTime(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("h:mma"));
      showMonthViewCalendar && selectedEvent ?setEventEndTime(updateEndTime):setEventEndTime(moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("h:mma"));
      showMonthViewCalendar && selectedEvent ? setStartDateTime(updateStartDateTime):setStartDateTime(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0).format("h:mma"));
      showMonthViewCalendar && selectedEvent ? setEndDateTime(updateEndDateTime): setEndDateTime(moment(moment().add( moment().minute() > 30 && 1 , 'hours').minutes( moment().minute() <= 30 ? 30 : 0)).add(1, 'hours').format("h:mma"));
      showDayViewCalendar && selectedEvent ? setDayViewEventStartTime(updateStartTime):setDayViewEventStartTime(dayViewEventStartTime);
      showDayViewCalendar && selectedEvent ? setDayViewEventEndTime(updateEndTime):setDayViewEventEndTime(dayViewEventEndTime);
      showDayViewCalendar && selectedEvent ? setStartDateTime(updateStartDateTime):setDayViewEventStartTime(dayViewEventStartTime);
      showDayViewCalendar && selectedEvent ? setEndDateTime(updateEndDateTime):setDayViewEventEndTime(dayViewEventEndTime);
      setTitle(selectedEvent?selectedEvent.title:"");
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
      setEndTime,
      viewEvents,
      setViewEvents
      }}>
        {props.children}
    </GlobalContext.Provider>
  )
}
