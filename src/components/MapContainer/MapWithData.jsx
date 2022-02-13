import React from 'react'
import GoogleMapReact from 'google-map-react'

import MapMarker from '../MapMarker/MapMaker'

// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api"

import hospitalIcon from "../../assets/hospital.svg"
import churchIcon from "../../assets/church.svg"
import styles from "./styles.module.css"

const MapWithData = ({coordinates}) => {

  const center = {
    lat: Number(coordinates[0][0]),
    lng: Number(coordinates[0][1])
  }
  const zoom = 18


  return (
    <div className={styles.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
        defaultCenter={center}
        defaultZoom={zoom}
      >

        <MapMarker 
          lat={Number(coordinates[1][0])}
          lng={Number(coordinates[1][1])}
          placeName="Church"
          icon={churchIcon}
        />

        <MapMarker 
          lat={Number(coordinates[0][0])}
          lng={Number(coordinates[0][1])}
          placeName="Hospital"
          icon={hospitalIcon}
        />

        <MapMarker 
          lat={Number(coordinates[2][0])}
          lng={Number(coordinates[2][1])}
          placeName="Hospital"
          icon={hospitalIcon}
        />
      </GoogleMapReact>
    </div>
  );
  
}

export default MapWithData;