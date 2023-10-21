import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

import { v4 as uuidv4 } from "uuid";

import styles from "./Map.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useURLPosition } from "../hooks/useURLPosition";
import { useAppControl } from "../contexts/AppControlContext";
import { useGeolocation } from "../hooks/useGeolocation";

function Map() {
  const { savedPositions, mapPosition, setMapPosition, location } =
    useAppControl();
  const [mapLat, mapLng] = useURLPosition();

  const { isLoading, position, error, getPosition } = useGeolocation();

  useEffect(function () {
    getPosition();
  }, []);

  useEffect(
    function () {
      // getPosition();
      if (position) {
        setMapPosition([position.lat, position.lng]);
      }
    },
    [position, setMapPosition]
  );

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng, setMapPosition]
  );
  return (
    <div className={styles["mapContainer"]}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles["map"]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {savedPositions.map((location) => (
          <Marker key={uuidv4()} position={[location.lat, location.lng]}>
            <Popup>
              {location?.locality}, {location?.city}
            </Popup>
          </Marker>
        ))}

        <LocationMarker mapPosition={mapPosition} />
        {/* HANDLE CLICK EVENT ON MAP */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function LocationMarker({ mapPosition }) {
  const map = useMapEvent({});
  useEffect(() => {
    if (mapPosition) {
      map.flyTo(mapPosition, map.getZoom());
    }
  }, [mapPosition, map]);
}

function DetectClick() {
  const navigate = useNavigate();
  const { setModal } = useAppControl();
  useMapEvent({
    click(e) {
      navigate(`modal?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      setModal(false);
    },
  });
}

export default Map;
