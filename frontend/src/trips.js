import styles from "./css/trips.module.css";
import { useState } from "react";

export default function Trips() {
  const [arrowState, setArrowState] = useState({
    existingTrip: true,
    previousTrip: true,
  })
  function switchArrowState(category) {
    setArrowState(prev => {
      return {
        ...prev,
        [category]: !arrowState[category]
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.newTripBtn} onClick={newTrip}>
          <p>New Trip</p>
          <div className={styles.circlePuls}>
            <span className={styles.verticalBar}></span>
            <span className={styles.horizontalBar}></span>
            <span className={styles.circle}></span>
          </div>
        </div>
        <div className={styles.tripDisplay}>
          <div className={styles.categoryName}>
            <p>Existing Trips</p>
            <div className={styles.arrow} onClick={() => switchArrowState("existingTrip")}>
              <span className={arrowState.existingTrip ? styles.diagonal1 : styles.diagonal3}></span>
              <span className={arrowState.existingTrip ? styles.diagonal2 : styles.diagonal4}></span>
            </div>
          </div>
          <div className={styles.tripDetail}>
            <p>1st Trip</p>
            <p>Traveling period</p>
          </div>
          <div className={styles.tripDetail}>
            <p>2nd Trip</p>
            <p>Traveling period</p>
          </div>
        </div>
        <div className={styles.tripDisplay}>
        <div className={styles.categoryName}>
            <p>Previous Trips</p>
            <div className={styles.arrow} onClick={() => switchArrowState("previousTrip")}>
              <span className={arrowState.previousTrip ? styles.diagonal1 : styles.diagonal3}></span>
              <span className={arrowState.previousTrip ? styles.diagonal2 : styles.diagonal4}></span>
            </div>
          </div>
          <div className={styles.tripDetail}>
            <p>1st Trip</p>
            <p>Traveling period</p>
          </div>
          <div className={styles.tripDetail}>
            <p>2nd Trip</p>
            <p>Traveling period</p>
          </div>
        </div>
        {/* <Link to="/tripDetails">
          <button type="button">Trip Details</button>
        </Link> */}
      </div>
    </div>
  );
}



function newTrip() {
  console.log("create new trip");
}

