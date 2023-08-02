import { useLocation, useNavigate } from "react-router-dom";
import styles from "./css/tripDtails.module.css";
import NonFetchPlaceDetail from "./components/NonFetchPlaceDetail";
import { useId, useState } from "react";
import Calendar from "react-calendar";
import "./components/reactCalendar.css";
import { usePlaceDetails } from "./components/usePlaceDetails";
import { updateTrip } from "./components/updateTrip"
import Header from "./header";
import { handleInput } from "./components/handleInput";
import { auth } from "./config/firebase-config";
import { formatDate } from "./components/formatDate";

export default function TripDetails() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [allSchedules, setAllSchedules] = useState(state.schedules);
  const [selectedDate, setSelectedDate] = useState(pathname.replace("/tripDetails/", ""));

  // for react-calendar
  const [value, onChange] = useState(new Date());

  // display state
  const [detailDisplayState, setDetailDisplayState] = useState(false);
  const [edit, setEdit] = useState(false)

  // place detail data
  const [placeDetail, setPlaceDetail] = useState();

  // a place data that will be passed to placeDetail component
  // const placeData = new Map();
  //! for prod
  const placeData = usePlaceDetails(allSchedules.get(selectedDate) ?? new Map());

  const dateInputId = useId();
  const noteInputId = useId();
  // for edit user schedule
  const [input, setInput] = useState({

  });

  const accessToken = auth?.idTokenSubscription?.auth?.currentUser?.accessToken;
  async function update(trip, dateInputId, noteInputId, newPlaceIds) {
    const { _id, body } = generateUpdateData(trip, dateInputId, noteInputId, newPlaceIds);
    console.log(body);
    await updateTrip(_id, body);
    const data = await fetch(`${process.env.REACT_APP_BASE_URL}/trips/${_id}`, {
      method: "GET",
      headers: {
        authorization: accessToken
      },
      cache: "no-store"
    })
    const updatedTrip = await data.json();
    updateSchedules(_id, updatedTrip);
    setAllSchedules(new Map(allSchedules));
  }

  function updateSchedules(_id, updatedTrip) {
    const formattedDate = formatDate(updatedTrip.date.toString());
    const targetIndex = allSchedules.get(selectedDate).findIndex((el) => el._id === _id);
    if (selectedDate === formattedDate) {
      allSchedules.get(selectedDate)[targetIndex] = updatedTrip;
    } else {
      allSchedules.get(selectedDate)[targetIndex] = allSchedules.get(selectedDate)[allSchedules.get(selectedDate).length-1];
      allSchedules.get(selectedDate).pop();
      allSchedules.has(formattedDate) ? allSchedules.get(formattedDate).push(updatedTrip) : allSchedules.set(formattedDate, [updatedTrip]);
    }
    return navigate(`/tripDetails/${selectedDate}`, {state: {schedules: allSchedules}});
  }

  function generateUpdateData(trip, dateInputId, noteInputId, newPlaceIds) {
    const body = {
      userId: trip.userId,
      date: input[`${dateInputId}${trip._id}`] ?? trip.date,
      note: input[`${noteInputId}${trip._id}`] ?? trip.note,
      placeIds: Array.from(newPlaceIds)
    }
    return { _id: trip._id, body: body };
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {detailDisplayState
            ?
            <section className={styles.overwrap}>
              <button className={styles.close} onClick={() => setDetailDisplayState(false)}><u>close</u></button>
              <div className={styles.detailDisplay}>
                <NonFetchPlaceDetail placeData={placeDetail} />
              </div>
            </section>
            :
            <>
              <div className={styles.imageContainer}>
                <img className={styles.tripImage} src={require("./images/background.jpg")} alt="trip" />
                <span className={styles.tripName}>{selectedDate}</span>
              </div>
              <div className={styles.subContainer}>
                <section className={styles.tripSection}>
                  <div className={styles.header}>
                    <div className={styles.sectionName}>
                      <h2>Itinerary</h2>
                    </div>
                    <div>
                      <button className={styles.btn} onClick={() => setEdit(!edit)}>Edit</button>
                    </div>
                  </div>
                  <div>
                    <div className={styles.schedules}>
                      {allSchedules.get(selectedDate)?.map((trip, index) => {
                        const time = getTime(trip?.date);
                        const newPlaceIds = new Set([...trip.placeIds]);
                        return (
                          <div key={index}>
                            <div className={styles.schedule}>
                              <div className={styles.scheduleTime}>
                                <span>{time}</span>
                              </div>
                              <p>{trip.note}</p>
                              <ul className={styles.scheduledPlaceList}>
                                {
                                  trip.placeIds.length === 0 ? <li>No trip</li>
                                    :
                                    trip.placeIds.map((placeId, index) => {
                                      return (
                                        <li key={index}>
                                          <button onClick={() => openDetail(placeId)}><u>{placeData.get(placeId)?.name}</u></button>
                                        </li>
                                      )
                                    })
                                }
                              </ul>
                            </div>
                            <div className={edit ? styles.editOn : styles.editOff}>
                              <input id={`${dateInputId}${trip._id}`} type="datetime-local" onChange={(e) => handleInput(e, setInput)} value={input.dateInputId} />
                              <input id={`${noteInputId}${trip._id}`} type="text" onChange={(e) => handleInput(e, setInput)} value={input.noteInputId} />
                              <div>
                                {
                                  trip.placeIds.length
                                    ?
                                    trip.placeIds.map((placeId, index) => {
                                      return (
                                        <div key={index}>
                                          <input type="checkbox" id={placeId} name={placeId} value={placeData.get(placeId)?.name} onClick={() => addSet(newPlaceIds, placeId)} defaultChecked />
                                          <label htmlFor={placeId}>{placeData.get(placeId)?.name}a</label>
                                        </div>
                                      )
                                    })
                                    : <p>No trip</p>
                                }
                              </div>
                              <button onClick={() => update(trip, dateInputId, noteInputId, newPlaceIds)}>Apply Edit</button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <span className={styles.line}></span>
                </section>
                <section className={styles.menuSection}>
                  <Calendar onChange={onChange} onClickDay={(e) => changeDate(e)} value={value} />
                </section>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );

  // calendar
  function changeDate(e) {
    const formattedDate =
      `${e.getFullYear()}/${(e.getMonth() + 1).toString().padStart(2, "0")}/${e.getDate().toString().padStart(2, "0")}`;
    setSelectedDate(formattedDate);
    return navigate(`/tripDetails/${formattedDate}`, { state: { schedules: allSchedules } });
  }

  function getTime(dateString) {
    const date = new Date(dateString);
    const time = date.getUTCHours().toString().padStart(2, "0") + ":" + date.getUTCMinutes().toString().padStart(2, "0");
    return time;
  }

  function openDetail(placeId) {
    if (!placeData.has(placeId)) return;
    setDetailDisplayState(true);
    setPlaceDetail(placeData.get(placeId));
  }
}

function addSet(set, placeId) {
  set.has(placeId) ? set.delete(placeId) : set.add(placeId);
}