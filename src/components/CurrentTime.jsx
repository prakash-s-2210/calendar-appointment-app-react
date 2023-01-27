import React, {useEffect, useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import "../css files/CurrentTime.scss"
import moment from 'moment/moment';
export default function CurrentTime() {
    // const { currentTime, setCurrentTime } = useContext(GlobalContext);
    const [ position, setPosition ] = useState(null);
    const [ seconds, setSeconds ] = useState(null);
    useEffect(()=>{
      // setPosition((moment().format("H") * 40)+ (moment().format('m')*60)+moment().format('s'));
      let hoursPosition = moment().format('H')*40;
      let minutesPosition = (moment().format('m')*40)/60;
      let startingPosition = Math.floor(hoursPosition+minutesPosition);
      let totalSecondsForADay = 86400;
      let currentSeconds = moment().format('H') * 3600;
      let seconds = totalSecondsForADay - currentSeconds;
      setPosition(startingPosition);
      setSeconds(seconds);

    }, [])
  return (
    <div className='current-time-flex' style={{transform: `translateY(${position}px)`,
    animationDuration: `${seconds}s`,
    animationName: "linemove",
    animationFillMode: "forwards",
    zIndex:"2"
 }}>
      <div className='current-time-round' ></div>
      <div className='current-time'></div>
    </div>
  )
}
