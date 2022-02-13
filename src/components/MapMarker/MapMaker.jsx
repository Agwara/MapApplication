import React, {useState} from "react"

import styles from "./styles.module.css"

const MapMarker = (props) => {
  const [openInfoWindow, setOpenInfoWindow] = useState(false)

  const handleWindowOpen = () => {
    setOpenInfoWindow(!openInfoWindow)
  }

  const InfoContent = () => {
    return (
      <div className={styles.infoWindow}>
        <span onClick={handleWindowOpen} className={styles.cross} role="img" aria-label="cross">&#x274C;</span>  
        <div className={styles.infoContent}>
          <p className={styles.placeName}>{props.placeName}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {
        openInfoWindow ? <InfoContent /> : ""
      }
      <img
        alt={props.placeName}
        src={props.icon} 
        onClick={handleWindowOpen}
        height="30"
        width="30"
      />
    </div>
  )
}

export default MapMarker