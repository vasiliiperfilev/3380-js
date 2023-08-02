import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";

export default function useTrips() {
  const [trips, setTrips] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch(`${process.env.REACT_APP_BASE_URL}/trips`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + user.accessToken
          }
        })
          .then(res => {
            return res.json()
          })
          .then(data => {
            const schedules = new Map();
            data.forEach((trip) => {
              const key = formatDate(trip.date);
              if (schedules.has(key)) schedules.get(key).push(trip);
              else schedules.set(key, [trip]);
            });
            return schedules
          })
          .then(schedules => {
            setTrips(schedules);
          })
          .catch(e => {
            console.log(e);
          })
      }
    })
  }, [])

  return trips;
}

function formatDate(stringDate) {
  return stringDate.replace(/-/g, "/").slice(0, 10);
}