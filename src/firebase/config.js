// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgBlbYAI-ofV4BbbXsjBtSAVKEi9CVAkk',
  authDomain: 'react-cursos-834d8.firebaseapp.com',
  projectId: 'react-cursos-834d8',
  storageBucket: 'react-cursos-834d8.firebasestorage.app',
  messagingSenderId: '973477539485',
  appId: '1:973477539485:web:60aed2168897325ddb6e74'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)
