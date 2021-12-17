import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { firebaseConfig } from "./firebaseConfig"
import { IHero, IUser, IRoom } from './types';


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const storage = firebase.storage()

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginWithFacebookPopup: async (setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>) => {
    const provider = new firebase.auth.FacebookAuthProvider()
    let result = await app.auth().signInWithPopup(provider)
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
  loginWithGooglePopup: async (setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    let result = await app.auth().signInWithPopup(provider)
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
  fileUploader: async (file: File, userId: string, onProgress: (e: firebase.storage.UploadTaskSnapshot) => void, onError: (e: firebase.storage.FirebaseStorageError) => void, onComplete: (url: string) => void) => {
    const storageRef = await storage.ref(`arquivos/${userId}/${new Date().getTime()}/${file.name}`)
    const task = storageRef.put(file)
    task.on("state_changed", onProgress, onError, async () => {
      debugger
      const urlImage = await task.snapshot.ref.getDownloadURL()
      onComplete(urlImage)
    })
  },
  addUser: async (user: IUser) => {
    return await db.collection("users").doc(user.email).set(user, { merge: true })
  },
  addOrUpdateHero: async (hero: IHero) => {
    if (hero.id) {
      return await db.collection("heroes").doc(hero.id).set(hero, { merge: true })
    } else {
      return await db.collection("heroes").add({ ...hero, createdAt: new Date() })
    }
  },
  getHeros: async (filterHero: IHero) => {
    const snapshot = await db.collection("heroes").orderBy("createdAt", "desc").get()
    return snapshot.docs.map(doc => {
      return {
        id: doc.id, ...doc.data()
      }
    })
  },
  getRoomById: async (id: string, setRoom: React.Dispatch<React.SetStateAction<IRoom | undefined>>) => {
    await db.collection("rooms").doc(id).onSnapshot((response)=>{
      debugger
      setRoom(response.data())
    })
  },
  getRooms: async (filterRoom: IRoom) => {
    const snapshot = await db.collection("rooms").orderBy("createdAt", "desc").get()
    return snapshot.docs.map(doc => {
      return {
        id: doc.id, ...doc.data()
      }
    })
  },
  addOrUpdateRoom: async (room: IRoom) => {
    if (room.id) {
      return await db.collection("rooms").doc(room.id).set(room, { merge: true })
    } else {
      return await db.collection("rooms").add({ ...room, createdAt: new Date() })
    }
  },
}