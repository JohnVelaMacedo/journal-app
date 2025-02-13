import { CircularProgress, Grid2 } from '@mui/material'

function CheckingAuth() {
  return (
    <Grid2
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4
      }}
    >
      <Grid2 sx={{ width: { sm: 450 }, textAlign: 'center' }}>
        <CircularProgress color='warning' />
      </Grid2>
    </Grid2>
  )
}

export default CheckingAuth
