import React, {useState} from "react"

import ActionContainer from "./components/ActionContainer/ActionContainer"
import MapContainer from "./components/MapContainer/MapContainer"
import MapWithData from "./components/MapContainer/MapWithData"

import appStyles from "./App.module.css"

const  App = () => {
  const [coordinates, setCoordinates] = useState([])

  return (
    <div className={appStyles.container}>
      <div className={appStyles.actionContainer}>
        <ActionContainer setCoordinates={setCoordinates} />
      </div>

      <div className={appStyles.mapContainer}>
        {
          coordinates.length === 0 ? <MapContainer /> : 
          <MapWithData coordinates={coordinates} />
        }
      </div>
    </div>
  );
}

export default App;
