import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home({ events, setEvents }) {
  
  if (!events) {
    return (
      <div
        style={{
          position: "absolute",
          marginTop: "100px",
          marginLeft: "375px",
        }}
      >
        Chargement...
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ position: "absolute", width: "100%" }}>
          <h2
            style={{
              marginTop: "100px",
              marginLeft: "375px",
              position: "absolute",
            }}
          >
            Evènements à venir :
          </h2>
        </div>
        <div style={{ marginTop: "150px",marginBottom: "10px", position: "absolute" }}>
          {events.records.map((event) => (
            <div key={event.id} className="event-card">
              <div style={{ float: "left", paddingRight: "15px" }}>
                <img src={event.fields.image} alt="" className="event-img" />
              </div>
              <div>
                <h2>{event.fields.title}</h2>
              </div>
              <div>
                <p>{event.fields.description}</p>
              </div>
              <div>
                <br></br>
                <NavLink id="button"
                  to={"events_details/?uid=" + event.fields.uid}
                >
                  En savoir plus
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
