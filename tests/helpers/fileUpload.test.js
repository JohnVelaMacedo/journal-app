import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload'

cloudinary.config({
  cloud_name: 'dsigxuian',
  api_key: '934253364182665',
  api_secret: 'NBG1Vjug_n5GG6nPLDofiOy8Ob0',
  secure: true
})

describe('Pruebas en fileUpload', () => {
  test('debe de subir el archivo correctamente a cloudinary', async () => {
    const imageUrl =
      'https://statics.forbesargentina.com/2022/06/629f81fe391f3.jpg'
    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'foto.jpg')
    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')

    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image'
    })
  })

  test('debe de retornar null', async () => {
    const file = new File([], 'foto.jpg')
    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
