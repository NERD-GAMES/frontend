// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { IUser } from './App';
import { firebaseConfig } from "./firebaseConfig"


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginWithFacebookPopup: async (setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>) => {
    const provider = new firebase.auth.FacebookAuthProvider()
    let result = await app.auth().signInWithPopup(provider)
    debugger
    // const result = {
    //   user:{
    //     uid: "2",
    //     displayName: "Hercules",
    //     photoURL: "https://images.emojiterra.com/google/android-11/512px/1f9cd.png",
    //     email: "hercules.maranhao@hotmail.com"
    //   }
    // }

    if (result.user) {
      const user = {
        id: result.user.uid,
        name: result.user.displayName || "",
        photoURL: result.user.photoURL || "",
        email: result.user.email || ""
      }
      setUser(user)
      return user
    }

    return null

  },
  addUser: async (user: IUser) => {
    try {
      let result = await db.collection("users").doc(user.email).set({
        name: user.name,
        id: user.id,
        email: user.email,
        photoURL: user.photoURL
      }, { merge: true })
      return result
    } catch (error) {
    }
  }
}