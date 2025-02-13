import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid2, TextField, Typography } from '@mui/material'
import ImageGallery from '../components/ImageGallery'

function NoteView() {
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
          28 de agosto, 2023
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
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió hoy?'
          minRows={5}
        />
      </Grid2>

      <ImageGallery />
    </Grid2>
  )
}

export default NoteView
