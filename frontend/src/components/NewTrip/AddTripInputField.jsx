import { useState } from "react";
import styles from "./NewTrip.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { handleInput } from "../handleInput";

export default function AddTripInputField({ destinations, resetFunc }) {
  const [input, setInput] = useState({
    note: "",
    date: "",
  });

  async function createTrip() {
    onAuthStateChanged(auth, async (user) => {
      const body = {
        userId: user.uid,
        date: input.date,
        note: input.note,
        placeIds: Array.from(destinations.values())
      }

      if (!body.date || !body.placeIds.length) {
        window.alert("Must input date and destinations");
        return;
      }
      try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/trips`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken
          },
          body: JSON.stringify(body)
        })
        setInput({
          date: "",
          note: ""
        })
        resetFunc(new Map());
        window.alert("Trip saved")
      } catch (e) {
        window.alert("There si something wrong. try later");
      }
    })
  }
  return (
    <section>
      <div className={styles.dateInput}>
        <label htmlFor="date">Trip Date: </label>
        <input id="date" type="datetime-local" value={input.date} onChange={(e) => handleInput(e, setInput)} />
      </div>
      <div className={styles.dateInput}>
        <label htmlFor="note">Note: </label>
        <input id="note" type="text" value={input.note} onChange={(e) => handleInput(e, setInput)} />
      </div>
      <p>{destinations.size} destinations are selected</p>
      {destinations.size ?
        <>
          <ul className={styles.selectedTrips}>
            {
              Array.from(destinations.keys()).map((trip, index) => {
                return <li key={index}>{trip}</li>
              })
            }
          </ul>
        </>
        : <></>
      }
      <button className={styles.btn} onClick={createTrip}>Create Trip</button>
    </section>
  )
}
