import React from "react"

import styles from "./styles.module.css"


const Loading = ({loading}) => {

  if (loading) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          
          <h3>Loading Data...</h3>
          
          <div className={styles.loader}></div>
        </div>
      </div>
  
    )
  } else {
    return <div></div>
  }
}

export default Loading