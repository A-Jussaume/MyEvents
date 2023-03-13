import React from "react";
import { useState, useEffect } from "react";

function Events_details({eventDetails, setEventDetails}) {
  const queryParams = new URLSearchParams(window.location.search);
  const uid = queryParams.get("uid");
  console.log(uid);

  useEffect(() => {
    fetch("http://localhost:8000/event_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: uid,
      }),
    })
      .then((res) => res.json())
      .then((response) => setEventDetails(response));
    console.log(eventDetails);
  }, []);

  if (!eventDetails) {
    return <div className="message">Chargement...</div>;
  } else {
    return (
      <div>
        <div style={{ marginTop: "100px", position: "absolute" }}>
          {eventDetails.records.map((event) => (
            <div key={event.id} className="event-card-details">
              <div>
                <h2>{event.fields.title}</h2>
              </div>
              <div style={{display: "flex"}}>
                <img src={event.fields.image} alt="" className="event-img"/>
                <div style={{paddingLeft: "20px"}}>
                  <p>
                    <strong>Date :</strong> {event.fields.date_start}
                  </p>
                  <p>
                    <strong>Lieu :</strong> {event.fields.address}
                  </p>
                </div>
              </div>
              <div>
                <h3>Description de l'évènement :</h3>
                <p>{event.fields.free_text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Events_details;
