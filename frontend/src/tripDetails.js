import { useLocation } from "react-router-dom";
import CalendarComponent from "./components/CalendarComponent";
import styles from "./css/tripDtails.module.css";
import PlaceDetail from "./components/NewTrip/components/PlaceDetail/PlaceDetail.jsx";
import { useState } from "react";
import { handleInput } from "./components/handleInput.jsx";

export default function TripDetails() {
  const [input, setInput] = useState({
    date: "",
    note: ""
  });
  const [placeId, setPlaceId] = useState();
  const [detail, setDetail] = useState(false);
  const location = useLocation();
  const { schedules, date } = location.state;
  const selectedDateSchedule = schedules.get(date);
  console.log(selectedDateSchedule);
  // calendar

  function editTrip() {
    if (!input.date && !input.note) {
      window.alert("required to input date or new note");
    }
  }

  function openDetail(placeId) {
    setDetail(true);
    setPlaceId(placeId);
  }

  function DetailSection() {
    return (
      <section className={styles.overwrap}>
        <button className={styles.close} onClick={() => setDetail(false)}><u>close</u></button>
        <div className={styles.detailDisplay}>
          <PlaceDetail placeId={placeId} />
        </div>
      </section>
    )
  }

  function DisplaySchedules() {
    return selectedDateSchedule.map((trip, index) => {
      return (
        <div key={index} className={styles.schedule}>
          <div className={styles.scheduleTime}>
            <span>Schedule {index + 1}</span>
          </div>
          <p>{trip.note}</p>
          <ul>
            {
              trip.placeIds.map((place, index) => {
                return (
                  <li key={index}>
                    <button onClick={() => openDetail(place)}>place{index + 1}</button>
                  </li>
                )
              })
            }
          </ul>
          <button className={styles.btn} onClick={() => editTrip()}>Edit</button>
          <InputField />
        </div>
      )
    })
  }


  function InputField() {
    return (
      <div>
        <input name="date" type="date" value={input.date} onChange={(e) => handleInput(e, setInput)}></input>
        <input name="note" type="text" placeholder="New note" value={input.note} onChange={(e) => handleInput(e, setInput)}></input>
      </div>
    )
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {detail ? <DetailSection /> : <></>}
        <div className={styles.imageContainer}>
          <img className={styles.tripImage} src={require("./images/background.jpg")} alt="trip" />
          <span className={styles.tripName}>{location.state.date}</span>
        </div>
        <div className={styles.subContainer}>
          <section className={styles.tripSection}>
            <div className={styles.sectionName}>
              <h2>Itinerary</h2>
            </div>
            <div>
              <div className={styles.schedules}>
                <DisplaySchedules />
              </div>
            </div>
            <span className={styles.line}></span>
          </section>
          <section className={styles.menuSection}>
            <CalendarComponent />
          </section>
        </div>
      </div>
    </div>
  );
}


// function initSampleData() {
//   const testUserTripData = [{
//     startTime: "8:30 AM",
//     endTime: "9:30 AM",
//     description: "optional"
//   }, {
//     startTime: "9:30 AM",
//     endTime: "10:30 AM",
//     description: ""
//   },
//   {
//     startTime: "10:30 AM",
//     endTime: "11:30 AM",
//     description: ""
//   },
//   {
//     startTime: "1:30 PM",
//     endTime: "3:30 PM",
//     description: "optional"
//   },
//   {
//     startTime: "6:30 PM",
//     endTime: "10:30 PM",
//     description: "optional"
//   },]

//   return testUserTripData;
// }