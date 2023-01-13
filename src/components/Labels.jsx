import React from 'react'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import "../css files/SideBar.scss"

export default function Labels() {
    const {labels, updateLabel} = useContext(GlobalContext);
  return (
    <div className="labels-container">
        <p className='labels'>My calendars</p>
        {labels.map(({label: lbl, checked}, idx) => (
            
            <label key = {idx} className="label">
                <input 
                    type="checkbox" 
                    checked={checked}
                    className="label-check" 
                    style={{accentColor: `${lbl}`}} 
                    onChange={()=> 
                        updateLabel({label: lbl, checked: !checked})           
                    }
                />
                <span className='label-chk'>{lbl}</span>
            </label>
        ))}
    </div>
  );
}
