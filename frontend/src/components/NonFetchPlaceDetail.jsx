import styles from "./PlaceDetail/PlaceDetail.module.css";

export default function NonFetchPlaceDetail({ placeData }) {
  const data = placeData;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      {data
        ?
        <div className={styles.container}>
          <h1>{data.name}</h1>
          <p>{data?.editorial_summary?.overview}</p>
          <p>{data.formatted_address}</p>
          <p>{data.international_phone_number}</p>
          <div className={styles.links}>
            <div>
              <a href={data.website} target="_blank" rel="noreferrer">Website</a>
            </div>
            <div>
              <a href={data.url} target="_blank" rel="noreferrer">map</a>
            </div>
          </div>
          <table className={styles.customTable}>
            <thead>
              <tr>
                {days.map((day, index) => <th key={index}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                {data["current_opening_hours"]["weekday_text"].map((timeWithDay, index) => {
                  const time = timeWithDay.split("day: ")[1];
                  return <td key={index}>{time ?? ""}</td>
                })}
              </tr>
            </tbody>
          </table>
          <div>
            <h3>Reviews</h3>
            <ul className={styles.reviews}>
              {
                data.reviews.map((review, index) => {
                  return (
                    <li className={styles.review} key={index}>
                      <p>{review.author_name}</p>
                      <p>{review.text}</p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        : <></>
      }
    </>
  )
}