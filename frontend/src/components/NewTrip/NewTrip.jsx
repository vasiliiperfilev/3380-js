import { useState } from "react";
import styles from "./NewTrip.module.css";
import PlaceDetail from "../PlaceDetail/PlaceDetail.jsx";
import AddTripInputField from "./AddTripInputField";
import { handleInput } from "../handleInput";
import Header from "../../header";
import { auth } from "../../config/firebase-config";

export default function NewTrip() {
  const [detail, setDetail] = useState(false);
  const [placeId, setPlaceId] = useState();
  const [input, setInput] = useState({
    search: "",
  });
  const [destinations, setDestinations] = useState(new Map());
  const [data, setData] = useState([]);

  const accessToken = auth?.idTokenSubscription?.auth?.currentUser?.accessToken;
  async function searchPlaces() {
    if(input.search === "") return;
    const data = await fetch(`https://three380-js.onrender.com/places?q=${input.search}`, {
      method: "GET",
      headers: {
        authorization: accessToken
      }
    })

    const res = await data.json();
    setData(res);
  }
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {detail ? (
            <DetailSection placeId={placeId}/>
          ) : (
            <>
              <div>
                <span>Search for new trip</span>
                <input
                  id="search"
                  type="text"
                  value={input.search}
                  onChange={(e) => handleInput(e, setInput)}
                />
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => searchPlaces()}
                >
                  Search
                </button>
              </div>
              <AddTripInputField
                destinations={destinations}
                resetFunc={setDestinations}
              />
              <SearchResults />
            </>
          )}
        </div>
      </div>
    </div>
  );

  function addTrip(name, place_id) {
    if (destinations.has(name)) {
      destinations.delete(name);
      setDestinations(new Map(destinations));
    } else {
      destinations.set(name, place_id);
      setDestinations(new Map(destinations));
    }
  }

  function DetailSection() {
    return (
      <section className={styles.overwrap}>
        <button className={styles.close} onClick={() => setDetail(false)}>
          <u>close</u>
        </button>
        <div className={styles.detailDisplay}>
          <PlaceDetail placeId={placeId} />
        </div>
      </section>
    );
  }

  function SearchResults() {
    return (
      <ul className={styles.searchResults}>
        {data.map((place, index) => {
          return (
            <li key={index} className={styles.searchResult}>
              <div onClick={() => navigateToDetail(place.place_id)}>
                <h3>
                  <u>
                    <b>{place.name}</b>
                  </u>
                </h3>
              </div>
              <p>{place.formatted_address}</p>
              <p>
                Rate: {place.rating} &#40;{place.user_ratings_total}&#41;
              </p>
              <button
                className={styles.add}
                onClick={() => addTrip(place.name, place.place_id)}
              >
                add trip
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  function navigateToDetail(place_id) {
    setPlaceId(place_id);
    setDetail(true);
  }
}
