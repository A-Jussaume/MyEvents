import { NavLink } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ProSidebar, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import React, { useState, useEffect } from "react";

function Sidebar({ events, setEvents }) {
  const [formData, setFormData] = useState({
    categorie: null,
    lieu: null,
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => setEvents(response));
    console.log(events);
  };

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          
          setStatus("Unable to retrieve your location");
        }
        );
        console.log(lat, lng);
    }
  }, []);

  useEffect(async() => {
    if (lat && lng) {
      await fetch("http://localhost:8000/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({latitude: lat,
      longitude: lng,}),
    })
      .then((res) => res.json())
      .then((response) => setEvents(response));
    console.log(events);
  };
}, [lat && lng]);
  
  return (
    <div>
      <ProSidebar
        style={{
          width: "350px",
          height: "100vh",
          position: "fixed",
          marginTop: "100px",
          borderTopRightRadius: "20px",
          overflow: "hidden",
        }}
      >
        <SidebarHeader style={{ width: "300px", margin: "auto" }}>
          <h2>Menu</h2>
        </SidebarHeader>
        <SidebarContent style={{ width: "300px", margin: "auto" }}>
          <form method="POST">
            <div>
              <h4>Filtres</h4>
              <div>
                <div>
                  <select
                    style={{ width: "185px", padding: "3px", borderRadius: "10px", backgroundColor: "#f1f2f6", border: "none", outline: "none" }}
                    name="categories"
                    onChange={(e) => {
                      const selectedCategorie = e.target.value;
                      setFormData({
                        ...formData,
                        categorie: selectedCategorie,
                      });
                    }}
                  >
                    <option value="none">Choisissez une catégorie</option>
                    <option value="musique">Musique</option>
                    <option value="concert">Concert</option>
                    <option value="exposition">Exposition</option>
                    <option value="danse">Danse</option>
                    <option value="théâtre">Théâtre</option>
                    <option value="spectacle">Spectacle</option>
                    <option value="sport">Sport</option>
                    <option value="festival">Festival</option>
                    <option value="atelier">Atelier</option>
                    <option value="culture">Culture</option>
                    <option value="animation">Animation</option>
                    <option value="visite">Visite</option>
                    <option value="art">Art</option>
                    <option value="conférence">Conférence</option>
                    <option value="patrimoine">Patrimoine</option>
                  </select>
                </div>
              </div>
              <br></br>
              <div>
                <div>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, lieu: e.target.value })
                    }
                    style={{ width: "175px", padding: "3px", borderRadius: "10px", backgroundColor: "#f1f2f6", border: "none", outline: "none" }}
                    value={formData.lieu}
                    type="text"
                    name="lieu"
                    placeholder="Lieu"
                  ></input>
                </div>
              </div>
              <br></br>
              <div>
                <input
                style={{ borderRadius: "10px", backgroundColor: "#f1f2f6", border: "none", outline: "none"}}
                  type="submit"
                  value="Filtrer"
                  onClick={HandleSubmit}
                ></input>
              </div>
            </div>
          </form>
          <br></br>
          <br></br>

          {/* MAP */}
          {lat && lng ? (
            <MapContainer
              className="map-container"
              center={[lat, lng]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lng]}></Marker>
            </MapContainer>
          ) : null}
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
