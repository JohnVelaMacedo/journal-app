import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithGoogle
} from '../../firebase/providers'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    console.log(email, password)
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()
    if (!result.ok) {
      dispatch(logout(result.errorMessage))
      return
    }
    // delete result.ok
    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        displayName,
        password
      })

    if (!ok) {
      dispatch(logout({ errorMessage }))
      return
    }

    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })
    !result.ok ? dispatch(logout(result)) : dispatch(login(result))
  }
}
