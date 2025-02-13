import {
  Alert,
  Button,
  Grid2,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router'
import { useForm } from '../../hooks/useForm'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import AuthLayout from '../layout/AuthLayout'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [
    (value) => value.includes('@'),
    'El correo debe de tener un @'
  ],
  password: [
    (value) => value.trim().length >= 6,
    'El password debe de tener más de 6 letras'
  ],
  displayName: [
    (value) => value.trim().length >= 1,
    'El nombre es obligatorio'
  ]
}

function RegisterPage() {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((state) => state.auth)
  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  )
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {
    displayName,
    email,
    password,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
    onInputChange
  } = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return

    dispatch(
      startCreatingUserWithEmailPassword({
        email,
        password,
        displayName
      })
    )

    console.log(formState)
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmit}>
        <Grid2
          container
          spacing={2}
        >
          <Grid2
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder='Nombre Completo'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid2>

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
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid2>

          <Grid2
            container
            size={12}
            spacing={2}
          >
            <Grid2
              size={{ xs: 12 }}
              display={errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid2>
          </Grid2>

          <Grid2
            container
            direction='row'
            justifyContent='end'
            size={12}
          >
            <Typography sx={{ mr: 0.1 }}>
              ¿Ya tienes una cuenta?
            </Typography>

            <Link
              color='inherit'
              to='/auth/login'
              component={RouterLink}
            >
              Ingresar
            </Link>
          </Grid2>
        </Grid2>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
