import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { FirebaseDB } from '../../firebase/config'
import { fileUpload } from '../../helpers/fileUpload'
import { loadNotes } from '../../helpers/loadNotes'
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
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

export const startSaveNotes = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFireStore = { ...note }
    delete noteToFireStore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(updateNote(note))
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())

    // const fileUploadPromises = []
    // for (const file of files) {
    //   fileUploadPromises.push(fileUpload(file))
    // }

    // const fileUploadPromises = Array.from(files).map((file) =>
    //   fileUpload(file)
    // )
    const fileUploadPromises = Array.from(files, (file) =>
      fileUpload(file)
    )
    const photosUrls = await Promise.all(fileUploadPromises)
    dispatch(setPhotosToActiveNote(photosUrls))
  }
}
