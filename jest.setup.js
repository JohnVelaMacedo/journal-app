import { TextDecoder, TextEncoder } from 'util'
import 'whatwg-fetch'
require('dotenv').config({
  path: '.env.test'
})

jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env })
}))

Object.assign(global, { TextDecoder, TextEncoder })
