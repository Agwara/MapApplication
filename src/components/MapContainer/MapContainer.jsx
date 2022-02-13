import React from 'react'
import GoogleMapReact from 'google-map-react'

import MapMarker from '../MapMarker/MapMaker'

import hospitalIcon from "../../assets/hospital.svg"
import styles from "./styles.module.css"

const MapContainer = () => {

  const zoom = 18

  const center = {
    lat: 6.57633,
    lng: 3.27732
  }

  return (
    <div className={styles.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <MapMarker 
          lat={6.57633}
          lng={3.27732}
          placeName="Hospital"
          icon={hospitalIcon}
        />

      </GoogleMapReact>
    </div>
  );
  
}

export default MapContainer;