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
            setTrips(data);
            // setTrips(initSampleData());
          })
          .catch(e => {
            console.log(e);
          })
      }
    })
  }, [])

  return trips;
}

// function initSampleData() {
//   const data = [
//     {
//       "_id": "64bf7cb57103257d2ed899cd",
//       "userId": "RLOWi1xiNkdQthj92qgyYOAG50Y2",
//       "date": "2023-07-26T00:00:00.000Z",
//       "note": "note",
//       "placeIds": [],
//       "__v": 0
//     },
//     {
//       "_id": "64bf80b0453437233d1bbd27",
//       "userId": "RLOWi1xiNkdQthj92qgyYOAG50Y2",
//       "date": "2023-07-27T00:00:00.000Z",
//       "note": "note",
//       "placeIds": [],
//       "__v": 0
//     },
//     {
//       "_id": "64bf80b6453437233d1bbd29",
//       "userId": "RLOWi1xiNkdQthj92qgyYOAG50Y2",
//       "date": "2023-07-28T00:00:00.000Z",
//       "note": "note",
//       "placeIds": [],
//       "__v": 0
//     },
//     {
//       "_id": "64bf80ba453437233d1bbd2b",
//       "userId": "RLOWi1xiNkdQthj92qgyYOAG50Y2",
//       "date": "2023-07-29T00:00:00.000Z",
//       "note": "note",
//       "placeIds": [],
//       "__v": 0
//     },
//     {
//       "_id": "64bf80be453437233d1bbd2d",
//       "userId": "RLOWi1xiNkdQthj92qgyYOAG50Y2",
//       "date": "2023-07-30T00:00:00.000Z",
//       "note": "note",
//       "placeIds": [],
//       "__v": 0
//     },
//     {
//       "_id": "64bf80c2453437233d1bbd2f",
//       "userId": "RLOWi1xiNkdQthj92qgyYOAG50Y2",
//       "date": "2023-07-31T00:00:00.000Z",
//       "note": "note",
//       "placeIds": [],
//       "__v": 0
//     },
//     {
//       "_id": "64bf8135ffbbece6ffc5291d",
//       "userId": "RLOWi1xiNkdQthj92qgyYOAG50Y2",
//       "date": "2023-08-01T00:00:00.000Z",
//       "note": "note",
//       "placeIds": [],
//       "__v": 0
//     }
//   ]

//   return data;
// }