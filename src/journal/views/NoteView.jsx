import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid2, TextField, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
// import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startSaveNotes } from '../../store/journal/thunks'
import ImageGallery from '../components/ImageGallery'

function NoteView() {
  const dispatch = useDispatch()
  const {
    active: note,
    messageSaved,
    isSaving
  } = useSelector((state) => state.journal)
  const { body, title, formState, date, onInputChange } =
    useForm(note)
  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState, dispatch])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNotes())
  }

  const onFileInputChange = () => {}

  return (
    <Grid2
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid2>
        <Typography
          fontSize={39}
          fontWeight='light'
        >
          {dateString}
        </Typography>
      </Grid2>

      <Grid2>
        <input
          type='file'
          multiple
          onChange={onFileInputChange}
        />

        <Button
          color='primary'
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid2>

      <Grid2
        container
        size={12}
      >
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió hoy?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid2>

      <ImageGallery />
    </Grid2>
  )
}

export default NoteView
