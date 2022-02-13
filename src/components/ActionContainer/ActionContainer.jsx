import React, {useState} from "react"
import axios from "axios"
import Loading from "../Loading/Loading"

import crossIcon from "../../assets/cross.svg"

import styles from "./styles.module.css"


const ActionContainer = (props) => {
  const [startLocation, setStartLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [showCross, setShowCross] = useState(false)

  const [successData, setSuccessData] = useState({})

  const [serverError, setServerError] = useState("")

  const [dataToken, setDataToken] = useState(null)

  const [showInputError, setShowInputError] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleReset = () => {
    setDropLocation("")
    setStartLocation("")
    setServerError("")
    setSuccessData({})
  }

  const onStartLocationChange = (e) => {
    setStartLocation(e.target.value)
    setShowInputError(false)
  }

  const onDropLocation = (e) => {
    setDropLocation(e.target.value)
    setShowInputError(false)
  }

  const clearStartLocation = () => {
    setStartLocation("")
  }

  const clearDropLocation = () => {
    setDropLocation("")
  }

  const handleSubmit = () => {
    setServerError("")
    setSuccessData({})

    if ((startLocation.length === 0) || (dropLocation.length === 0)) {
      setShowInputError(true)
    } else {
      fetchRouteToken()
    }
  }

  const fetchRouteToken = () => {
    setLoading(true)
    setShowCross(true)
    let requestBody = {
      origin: startLocation,
      destination: dropLocation
    }

    axios.post("https://mock-api.dev.lalamove.com/route", requestBody)
    .then((res) => {
      setDataToken(res.data.token)
      fetchRouteCoordinates(res.data.token)
    })
    .catch((error) => {
      if (error.response) {
        setServerError(error.response.data)
      }
      setLoading(false)
    })

  }

  const fetchRouteCoordinates = (dataTokenParams) => {
    let newParams = dataTokenParams || dataToken

    axios.get(`https://mock-api.dev.lalamove.com/route/${newParams}`)
    .then((res) => {
      if (res.data.status === "in progress") {
        console.log("Running Fetch Coordinates Again!")
        fetchRouteCoordinates()
      } else if (res.data.status === "success") {
        setLoading(false)  
        props.setCoordinates([...res.data.path])
        console.log(res.data.path)
        setSuccessData({...res.data})
      } else if (res.data.status === "failure") {
        setLoading(false)
        setServerError(res.data.error)
      }
    })
    .catch((error) => {
      if (error.response) {
        setServerError(error.response.data)
      }
      setLoading(false)  
    })
  }


  return (
    <div className={styles.container}>
      <Loading loading={loading} />
      {
        showInputError && <p className={styles.inputError}>Input fields should not be empty</p>
      }


      <div className={styles.containerTwo}>
        <div className={styles.inputContainer}>
          <label className={styles.labelText}>Starting Location</label>
          <input
            type="text"
            value={startLocation}
            onChange={onStartLocationChange}
            className={styles.inputCont}
          />

          {
            showCross && <img
              alt="cross"
              src={crossIcon}
              height="20px"
              width="20px"
              className={styles.crossIcon} 
              onClick={clearStartLocation}
            />
          }
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.labelText}>Drop-off Point</label>
          <input
            type="text"
            value={dropLocation}
            onChange={onDropLocation}
            className={styles.inputCont}
          />

          {
            showCross && <img
              alt="cross"
              src={crossIcon}
              height="20px"
              width="20px"
              className={styles.crossIcon} 
              onClick={clearDropLocation}
            />
          }
        </div>
      </div>

      <div className={styles.containerThree}>

        {
          successData.status === "success" && <div className={styles.successCont}>
            <p className={styles.successData}>Total Distance: {successData.total_distance}</p>
            <p className={styles.successData}>Total time: {successData.total_time}</p>
          </div>
        }

        {
          serverError.length > 0 && <p className={styles.serverError}>{serverError}, Please try again!</p>
        }

        <div className={styles.buttonContainer}>
          <button onClick={handleSubmit} className={styles.btnSubmit}>Submit</button>

          <button onClick={handleReset} className={styles.btnReset}>Reset</button>
        </div> 
      </div>     

    </div>
  )
}

export default ActionContainer