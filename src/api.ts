import firebase from 'firebase/compat/app';
import { query, where, collection, getDocs } from "firebase/firestore";
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
  loginWithFacebookPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    let result = await app.auth().signInWithPopup(provider)
    if (result.user) {
      const user = {
        id: result.user.uid,
        name: result.user.displayName || "",
        photoURL: result.user.photoURL || "",
        email: result.user.email || ""
      }
      return user
    }

    return null

  },
  loginWithGooglePopup: async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    let result = await app.auth().signInWithPopup(provider)
    if (result.user) {
      const user = {
        id: result.user.uid,
        name: result.user.displayName || "",
        photoURL: result.user.photoURL || "",
        email: result.user.email || ""
      }
      return user
    }

    return null

  },
  fileUploader: async (file: File, userId: string, onProgress: (e: firebase.storage.UploadTaskSnapshot) => void, onError: (e: firebase.storage.FirebaseStorageError) => void, onComplete: (url: string) => void) => {
    const storageRef = await storage.ref(`arquivos/${userId}/${new Date().getTime()}/${file.name}`)
    const task = storageRef.put(file)
    task.on("state_changed", onProgress, onError, async () => {
      const urlImage = await task.snapshot.ref.getDownloadURL()
      onComplete(urlImage)
    })
  },
  addUser: async (user: IUser) => {
    debugger
    const userDB = await (await db.collection("users").doc(user.email).get()).data()
    if (userDB) {
      return await db.collection("users").doc(user.email).set(user, { merge: true })
    }
    return await db.collection("users").doc(user.email).set({ ...user, gems: 100 }, { merge: true })
  },
  getUserById: async (email: string, setUser: (user: any) => void) => {
    await db.collection("users").doc(email).onSnapshot((response) => {
      setUser(response.data())
    })
  },
  addOrUpdateHero: async (hero: IHero) => {
    if (hero.id) {
      return await db.collection("heroes").doc(hero.id).set(hero, { merge: true })
    } else {
      return await db.collection("heroes").add({ ...hero, createdAt: new Date() })
    }
  },
  getHeros: async () => {
    const heroesRef = collection(db, 'heroes');
    const documentSnapshots = await getDocs(heroesRef);

    return documentSnapshots.docs.map(doc => {
      return {
        id: doc.id, ...doc.data()
      }
    })
  },
  getHerosToBuy: async () => {
    const heroesRef = collection(db, 'heroes');
    const q = query(heroesRef, where("userId", '==', ''), where("enabled", '==', true));
    const documentSnapshots = await getDocs(q);

    return documentSnapshots.docs.map(doc => {
      return {
        id: doc.id, ...doc.data()
      }
    })
  },
  getHerosByUserId: async (userId: string) => {
    const heroesRef = collection(db, 'heroes');
    const q = query(heroesRef, where("userId", '==', userId), where("enabled", '==', true));
    const documentSnapshots = await getDocs(q);

    return documentSnapshots.docs.map(doc => {
      return {
        id: doc.id, ...doc.data()
      }
    })
  },
  getRoomById: async (id: string, setRoom: React.Dispatch<React.SetStateAction<IRoom | undefined>>) => {
    await db.collection("rooms").doc(id).onSnapshot((response) => {
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