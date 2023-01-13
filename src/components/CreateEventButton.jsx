import React, { useContext } from 'react'
import plus from "../images/plus.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus  } from '@fortawesome/free-solid-svg-icons'
import "../css files/SideBar.scss"
import GlobalContext from '../context/GlobalContext'

export default function CreateEventButton() {
  const {setShowEventModal} = useContext(GlobalContext)
  return (
    <div className='create-event-wrapper'>
      <button className='create-event-button' onClick={() => setShowEventModal(true)}>
        <span className='create-event'>Create event</span>
        <FontAwesomeIcon icon ={faPlus} className="plus"></FontAwesomeIcon>
      </button>
    </div>
  )
}
