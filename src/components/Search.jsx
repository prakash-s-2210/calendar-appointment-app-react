import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
export default function Search() {
  return (
    <div className='search-wrapper'>
        <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
        <input type="text" placeholder='Search for people' className='search-input-box' />
    </div>
  )
}
