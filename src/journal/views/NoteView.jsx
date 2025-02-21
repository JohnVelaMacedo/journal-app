import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined
} from '@mui/icons-material'
import {
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
// import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import {
  startDeletingNote,
  startSaveNotes,
  startUploadingFiles
} from '../../store/journal/thunks'
import ImageGallery from '../components/ImageGallery'

function NoteView() {
  const fileInputRef = useRef()
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

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) {
      return
    }
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

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
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <input
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
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

      <Grid2
        container
        justifyContent='center'
      >
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color='error'
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid2>

      <ImageGallery images={note.imageUrls} />
    </Grid2>
  )
}

export default NoteView
