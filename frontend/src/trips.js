import styles from "./css/trips.module.css";
import { Link, useNavigate } from "react-router-dom";
import useTrips from "./components/useTrips";
import Header from "./header";
import { formatDate } from "./components/formatDate";

export default function Trips() {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const schedules = useTrips() ?? new Map();

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.buttons}>
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
                    <Link to={`/tripDetails/${formattedDate}`} state={{schedules: schedules}}>{formattedDate}</Link>
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
                    <Link to={`/tripDetails/${formattedDate}`} state={{schedules: schedules}}>{formattedDate}</Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function isPassed(current, target) {
  const currentDate = new Date(current).getTime();
  const targetDate = new Date(target).getTime();
  return currentDate > targetDate;
}
