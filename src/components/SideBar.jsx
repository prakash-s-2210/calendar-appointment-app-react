import React, { useContext } from "react";
import CreateEventButton from "./CreateEventButton";
import "../css files/SideBar.scss";
import Labels from "./Labels";
import GlobalContext from "../context/GlobalContext";
import SideBarCalendar from "./SideBarCalendar";
function SideBar(){
    const { isToggle } = useContext(GlobalContext);
    return(
        <aside className={`side-bar ${isToggle&&'display'}`}>
            <CreateEventButton />
            <div className="side-bar-position">
                <SideBarCalendar />
                <Labels />
            </div>
        </aside>
    );
}
export default SideBar;