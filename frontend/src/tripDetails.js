import CalendarComponent from "./components/CalendarComponent";
import styles from "./css/tripDtails.module.css";

const testUserTripData= [{
  startTime: "8:30 AM",
  endTime: "9:30 AM",
  description: "optional"
},{
  startTime: "9:30 AM",
  endTime: "10:30 AM",
  description: ""
},
{
  startTime: "10:30 AM",
  endTime: "11:30 AM",
  description: ""
},
{
  startTime: "1:30 PM",
  endTime: "3:30 PM",
  description: "optional"
},
{
  startTime: "6:30 PM",
  endTime: "10:30 PM",
  description: "optional"
},]

export default function TripDetails() {
  // fetch user trip data

  // if there is next day

  // calendar

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img className={styles.tripImage} src={require("./images/background.jpg")} alt="trip" />
          <span className={styles.tripName}>Trip Name</span>
        </div>
        <div className={styles.subContainer}>
          <section className={styles.tripSection}>
              <div className={styles.sectionName}>
                <h2>Itinerary</h2>
              </div>
              <div>
                <div className={styles.selectedScheduleDate}>
                  <p>Schedule data goes here</p>
                </div>
                  <div className={styles.schedules}>
                    {
                      testUserTripData.map((trip, index) => {
                        return(
                          <div key={index} className={styles.schedule}>
                            <div className={styles.scheduleTime}>
                              <span>{trip.startTime} - {trip.endTime}</span>
                            </div>
                            <p>{trip.description}</p>

                            <button className={styles.btn}>Edit</button>
                            <button  className={styles.btn}>Delete</button>
                          </div>
                        )
                      })
                    }
                  </div>
              </div>
              <span className={styles.line}></span>
            <div>
              <div className={styles.selectedScheduleDate}>
                <p>next schedule</p>
              </div>
            </div>
          </section>
          <section className={styles.menuSection}>
            <CalendarComponent />
          </section>
        </div>
      </div>
    </div>
  );
}
