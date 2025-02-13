import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid2, TextField, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import ImageGallery from '../components/ImageGallery'

function NoteView() {
  const { active: note } = useSelector((state) => state.journal)
  const { body, title, formState, date, onInputChange } =
    useForm(note)
  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

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
        <Button
          color='primary'
          sx={{ padding: 2 }}
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
