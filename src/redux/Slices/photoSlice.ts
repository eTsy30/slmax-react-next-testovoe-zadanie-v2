import { IPhotoStat } from '@/Types/Type'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: IPhotoStat = {
  data: [],
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const photos = []
  const perPage = 1
  const numPhotos = 120
  for (let page = 1; page <= Math.ceil(numPhotos / perPage); page++) {
    try {
      const response: any = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            client_id: 'ioeNa9wb88jQFAjFYBruioS7nbPxEonSA_cZzR0zNug',
            count: Math.min(perPage, numPhotos - photos.length),
          },
        }
      )
      console.log(Math.min(perPage, numPhotos - photos.length), 'aaaaaa')
      const data = response.data.map((item: any) => {
        return {
          id: item.id,
          description: item.alt_description,
          image: item.urls.small,
        }
      })

      photos.push(...data)
    } catch (error) {
      console.error('Ошибка при получении фотографий:', error)
    }
  }
  console.log(photos, 'ddd')

  return photos
})
export const photo = createSlice({
  name: 'photo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state: IPhotoStat, action) => {
      state.data = action.payload
    })
  },
  reducers: {},
})

export const {} = photo.actions
export default photo.reducer
