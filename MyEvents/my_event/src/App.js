import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Events_details from "./Pages/Events_details";

function App() {

  const [events, setEvents] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);

   if(eventDetails == null)
   {
  return (
    <div>
      <Router>
        <Navbar eventDetails={eventDetails} setEventDetails={setEventDetails} events={events} setEvents={setEvents}/>
        <Sidebar events={events} setEvents={setEvents}/>
        <Switch>
          <Route exact path="/">
            <Home events={events} setEvents={setEvents} />
          </Route>
          <Route path="/home">
            <Home events={events} setEvents={setEvents} />
          </Route>
          <Route path="/events_details">
            <Events_details eventDetails={eventDetails} setEventDetails={setEventDetails}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
   }
   else{
     return (
      <div>
      <Router>
        <Navbar eventDetails={eventDetails} setEventDetails={setEventDetails} events={events} setEvents={setEvents}/>
        <Switch>
          <Route exact path="/">
            <Home events={events} setEvents={setEvents} />
          </Route>
          <Route path="/home">
            <Home events={events} setEvents={setEvents} />
          </Route>
          <Route path="/events_details">
            <Events_details eventDetails={eventDetails} setEventDetails={setEventDetails}/>
          </Route>
        </Switch>
      </Router>
    </div>
     )
   }
}

export default App;
