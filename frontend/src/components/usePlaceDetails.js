import { useEffect, useMemo, useState } from "react";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export function usePlaceDetails(selectedDateSchedule) {
  // a place data that will be passed to placeDetail component
  const [placeData, setPlaceData] = useState(new Map());

  // get non-duplicated placeIds of the selected date
  // const [placeIds, setPlaceIds] = useState(new Set());
  const placeIds = useMemo(() => {
    const set = new Set();
    selectedDateSchedule.forEach((schedule) => {
      schedule.placeIds.forEach((placeId) => {
        set.add(placeId)
      })
    })
    return set;
  }, [selectedDateSchedule]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        placeIds.forEach(async (placeId) => {
          const data = await fetch(`https://three380-js.onrender.com/places/${placeId}`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${user.accessToken}`
            }
          })
          const res = await data.json();
          setPlaceData(prev => {
            prev.set(placeId, res)
            return new Map(prev);
          })
        })
      }
    })
  }, [placeIds])

  return placeData;
}