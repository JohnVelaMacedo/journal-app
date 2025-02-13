import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credential = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      // User Info,
      displayName,
      email,
      photoURL,
      uid
    }
    // The signed-in user info.
    // const user = result.user
    // IdP data available using getAdditionalUserInfo(result)
  } catch (error) {
    const { message: errorMessage } = error
    return { ok: false, errorMessage }
    // // The email of the user's account used.
    // const email = error.customData.email
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error)
  }
}

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName
}) => {
  try {
    console.log(displayName)

    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    const { uid, photoURL } = result.user
    // TODO: Actualizar el displayName en Firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return { ok: true, uid, photoURL, email, displayName }
  } catch (error) {
    // console.warn(error)
    return { ok: false, errorMessage: error.message }
  }
}

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    console.log(result)
  } catch (error) {
    console.warn(error)
    return { ok: false, errorMessage: error.message }
  }
}
