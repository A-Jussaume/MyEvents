import { NavLink } from "react-router-dom";
import React from "react";

function Navbar({eventDetails, setEventDetails, events, setEvents}) {

  function resetEvent(){
    setEventDetails(null);
    setEvents(null);
    window.history.replaceState(null, "New Page Title", "/home")
  }
  return (
    <div className="navbar">
      <NavLink onClick={resetEvent} id="logo" to="/home">
      My events
      </NavLink>
    </div>
  );
}

export default Navbar;
