import React, { useContext, useEffect, useRef, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet-routing-machine"; // Import Leaflet Routing Machine

import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { SourceLocContext } from '@/context/SourceLocContext';
import { DestLocContext } from '@/context/DestLocContext';
import { MainToggleContext } from '@/context/MainToggleContext';

// Setting the default icon for Leaflet
let DefaultIcon = L.icon({
  iconUrl: "",
  shadowUrl: iconShadow.src

});

L.Marker.prototype.options.icon = DefaultIcon;

// Define custom icons for source and destination markers
const sourceIcon = L.icon({
  iconUrl: '/source.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destinationIcon = L.icon({
  iconUrl: '/dest.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


function MapSection() {
  const { sourceLoc, setSourceLoc } = useContext(SourceLocContext);
  const { destLoc, setDestLoc } = useContext(DestLocContext);
  const { mainToggle, setMainToggle } = useContext(MainToggleContext);

  console.log("Mapsection");
  console.log(sourceLoc);
  console.log(destLoc);

  function Routing() {
    const map = useMap();
    let routingControlRef = useRef(null);

    useEffect(() => {

      if (sourceLoc && destLoc) {

        if (!map) return;

        try {

          if(routingControlRef.current) {
            map.removeControl(routingControlRef);
            routingControlRef = null;
          }

          routingControlRef.current = L.Routing.control({
            waypoints: [
              L.latLng(sourceLoc.lat, sourceLoc.lng),
              L.latLng(destLoc.lat, destLoc.lng)
            ],
            routeWhileDragging: false,
            lineOptions: {
              styles: [{ color: 'black', opacity: 0.6, weight: 4 }]
            },
          }).addTo(map);
        } catch (error) {
          console.error('Error occurred while adding routing control:', error);
        }

        return () => {
          if (routingControlRef.current) {
            try {
              routingControlRef.current.removeFrom(map);
            } catch (error) {
              console.error('Error occurred while removing routing control:', error);
            }
          }
        };
      }
    }, [map, mainToggle, sourceLoc, destLoc]);

    return null;
  }

  let bounds =  [[0,0],[0,0]];
  useEffect(() =>{

    if(sourceLoc && destLoc){
         bounds = L.latLngBounds([
        [sourceLoc.lat, sourceLoc.lng],
        [destLoc.lat, destLoc.lng]
      ]);
    }
  
  }, [sourceLoc, destLoc])

  

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer zoom={50} bounds={bounds} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sourceLoc && <Marker position={[sourceLoc.lat, sourceLoc.lng]} icon={sourceIcon}>
          {/* <Popup>
            Source Marker
          </Popup> */}
          <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>source : {sourceLoc.name}</Tooltip>
        </Marker>}
        {destLoc && <Marker position={[destLoc.lat, destLoc.lng]} icon={destinationIcon}>
          {/* <Popup >
            Destination Marker
          </Popup> */}
          <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>destination : {destLoc.name}</Tooltip>
        </Marker>}
        {sourceLoc && destLoc && <Routing />} {/* Include the Routing component */}
      </MapContainer>
    </div>
  );
}

export default MapSection;
