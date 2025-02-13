import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/authSlice'

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        dispatch(logout())
        return
      }
      const { displayName, email, uid, photoURL } = user
      dispatch(login({ displayName, email, uid, photoURL }))
    })
  }, [dispatch])

  return status
}
