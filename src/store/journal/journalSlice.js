import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
    // active: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 123456,
    //   imageUrl: []
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      console.log(action.payload)
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      console.log(state)
    },
    updateNote: (state, action) => {
      console.log(state, action)
    },
    deleteNotById: (state, action) => {
      console.log(state, action)
    }
  }
})

export const {
  addNewEmptyNote,
  deleteNotById,
  increment,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote
} = journalSlice.actions
