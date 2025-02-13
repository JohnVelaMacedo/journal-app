import { addDoc, collection } from 'firebase/firestore'
import { FirebaseDB } from '../../firebase/config'
import { loadNotes } from '../../helpers/loadNotes'
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes
} from './journalSlice'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    try {
      const docRef = await addDoc(
        collection(FirebaseDB, `/${uid}/journal/notes`),
        newNote
      )

      newNote.id = docRef.id

      dispatch(addNewEmptyNote(newNote))
      dispatch(setActiveNote(newNote))
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if (!uid) {
      throw new Error('El UID del usuario no existe')
    }
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}
