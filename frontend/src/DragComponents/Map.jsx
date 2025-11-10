import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Change_Theme_context } from "../Contexts";

const Map = ({
  latitude,
  longitude,
  onChange,
  width = "100%",
  height = 300,
}) => {
  const [coords, setCoords] = useState([latitude, longitude]);
  const [changeTheme, setChangeTheme] = useContext(Change_Theme_context);

  useEffect(() => {
    setCoords([latitude, longitude]);
  }, [latitude, longitude]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCoords([lat, lng]);
        onChange?.({ latitude: lat, longitude: lng });
      },
    });
    return null;
  };

  const locationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 41],
    iconAnchor: [15, 41],
  });

  return (
    <div
      className={`p-1 rounded-xl shadow-md  ${
        changeTheme ? "shadow-lightTeal" : "shadow-mainColor"
      } `}
      style={{ width, height }}
    >
      <MapContainer
        center={coords}
        zoom={15}
        minZoom={2}
        maxZoom={18}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        <Marker position={coords} icon={locationIcon} />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default Map;
