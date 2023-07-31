import styles from "./css/trips.module.css";
import LogoutComponent from "./logoutComponent";
import { Link, useNavigate } from "react-router-dom";
import useTrips from "./components/useTrips";

export default function Trips() {

  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const allTrips = useTrips() ?? [];
  const schedules = new Map();
  allTrips.forEach(trip => {
    const key = formatDate(trip.date);
    if(schedules.has(key)) schedules.get(key).push(trip);
    else schedules.set(key, [trip]);
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <LogoutComponent />
          <div className={styles.newTripBtn} onClick={() => navigate("/new-trip")}>
            <span>New Trip</span>
            <div className={styles.circlePuls}>
              <span className={styles.verticalBar}></span>
              <span className={styles.horizontalBar}></span>
              <span className={styles.circle}></span>
            </div>
          </div>
        </div>
        <div className={styles.tripDisplay}>
          <div className={styles.categoryName}>
            <p>Existing Trips</p>
          </div>
          {
            Array.from(schedules).filter(trip => !isPassed(currentDate, trip[0])).map((trip, index) => {
              const formattedDate = formatDate(trip[0]);
              return (
                <div key={index} className={styles.tripDetail} >
                  <p>trip no. {index}</p>
                  <Link to={"/tripDetails"} state={{ schedules: schedules, date: formattedDate }}>{formattedDate}</Link>
                </div>
              )
            })
          }
        </div>
        <div className={styles.tripDisplay}>
          <div className={styles.categoryName}>
            <p>Previous Trips</p>
          </div>
          {
            Array.from(schedules).filter(trip => isPassed(currentDate, trip[0])).map((trip, index) => {
              const formattedDate = formatDate(trip[0]);
              return (
                <div key={index} className={styles.tripDetail} >
                  <p>trip no. {index}</p>
                  <Link to={"/tripDetails"} state={{ schedules: schedules, date: formattedDate }}>{formattedDate}</Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

function isPassed(current, target) {
  const currentDate = new Date(current).getTime();
  const targetDate = new Date(target).getTime();
  return currentDate >= targetDate;
}

function formatDate(stringDate) {
  return stringDate.replace(/-/g, "/").slice(0,10);
}