import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export async function updateTrip(_id, body) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const data = await fetch(`https://three380-js.onrender.com/trips/${_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const res = await data.json();
      return res;
    }
  })
}