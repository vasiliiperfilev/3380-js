import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export function usePlaceDetail(placeId) {
  // a place data that will be passed to placeDetail component
  const [placeData, setPlaceData] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await fetch(`${process.env.REACT_APP_BASE_URL}/places/${placeId}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${user.accessToken}`
          }
        })
        const res = await data.json();
        setPlaceData(res);

      }
    })
  }, [placeId])

  return placeData;
}