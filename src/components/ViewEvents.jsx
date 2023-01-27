import React, {useContext,useEffect, useRef} from 'react'
import "../css files/EventModal.scss";
import GlobalContext from '../context/GlobalContext';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark, faClock, faUserGroup, faBookmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
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
    // const modalRef = useRef()
    const {savedEvents,viewEvents,setViewEvents, setSelectedEvent,selectedEvent, setShowEventModal } = useContext(GlobalContext);
    
  
    let domNode = useClickOutside(() => {
        setViewEvents(false);
    })
    
  return (
    
    <div className='event-modal-container'>
        <div className='view-modal' ref={domNode}>
            <header className='event-modal-header'>
                <FontAwesomeIcon icon ={faPen} className="edit-icon" onClick={()=>{
                    setShowEventModal(true);
                }}></FontAwesomeIcon>
                <div>
                    <button className="event-modal-close" onClick={() =>
                        {
                            setViewEvents(false);
                        }}
                        >
                        <FontAwesomeIcon icon ={faXmark} ></FontAwesomeIcon>
                    </button>
                </div>
            </header>
            <div className='event-modal-content' >
                {selectedEvent.title && <div className='title-container'>
                    <div className='title-design'><span className='label-design'style={{backgroundColor:`${selectedEvent.label}`}}></span></div>
                    <div className='title-name'>{selectedEvent.title}</div>
                </div>}
                {selectedEvent.startTime && <div className='event-scheduling-detail' style={{marginBottom:"15px"}}>
                    <FontAwesomeIcon icon ={faClock} className="schedule-icon"></FontAwesomeIcon>
                    <div className='view-event-time'>{moment(selectedEvent.startTime).format("dddd")}, {moment(selectedEvent.startTime).format("MMMM")} {moment(selectedEvent.startTime).format("D")} {moment(selectedEvent.startTime).format("hh:mm")} - {moment(selectedEvent.endTime).format("hh:mma")}</div>
                </div>}
                {selectedEvent.addDescription && <div className='add-description-flex' style={{marginBottom:"10px"}}>
                    <i class="material-symbols-outlined" >notes</i>
                    <div className='view-event-time'>{selectedEvent.addDescription}</div>
                </div>}
            </div>
        </div>
    </div>
  )
}