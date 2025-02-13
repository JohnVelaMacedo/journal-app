import { Google } from '@mui/icons-material'
import {
  Alert,
  Button,
  Grid2,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router'
import { useForm } from '../../hooks/useForm'
import {
  startGoogleSignIn,
  startLoginWithEmailPassword
} from '../../store/auth/thunks'
import AuthLayout from '../layout/AuthLayout'

const formData = {
  email: '',
  password: ''
}

function LoginPage() {
  const { status, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { email, password, onInputChange } = useForm(formData)
  const isAuthenticating = useMemo(
    () => status === 'checking',
    [status]
  )

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn')
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title='Login'>
      <form
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid2
          container
          spacing={2}
        >
          <Grid2
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid2>

          <Grid2
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid2>

          <Grid2
            size={{ xs: 12 }}
            display={errorMessage ? '' : 'none'}
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid2>

          <Grid2
            container
            size={12}
            spacing={2}
          >
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button
                variant='contained'
                fullWidth
                type='button'
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />

                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid2>
          </Grid2>

          <Grid2
            container
            direction='row'
            justifyContent='end'
            size={12}
          >
            <Link
              color='inherit'
              to='/auth/register'
              component={RouterLink}
            >
              Crear una cuenta
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
