import React, {useEffect, useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import moment from 'moment/moment';
export default function CurrentTime() {
    const { currentTime, setCurrentTime } = useContext(GlobalContext);
    useEffect(()=>{
        setCurrentTime(moment().format("HH"))
        console.log(moment().format("H"))
    }, [])
  return (
    <div>{currentTime}</div>
  )
}
