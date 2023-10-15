import { IPhoto, IPhotoStat } from '@/Types/Type'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: IPhotoStat = {
  data: [],
  displayedData: [],
  totalPage: 0,
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const photos = []
  const perPage = 1
  const numPhotos = 120
  for (let page = 1; page <= 4; page++) {
    try {
      const response: any = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            client_id: 'OjYRGlWvQ-6z16DSixxwVIC_sqDqGWVUwP9bzAmDdpI',
            count: 30,
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
  console.log(photos.length, '########')

  return photos
})
export const photo = createSlice({
  name: 'photo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state: IPhotoStat, action) => {
      state.data = action.payload
      state.totalPage = Math.ceil(action.payload.length / 10)
    })
  },
  reducers: {
    setData: (state, action: PayloadAction<IPhoto[]>) => {
      state.displayedData = action.payload
    },
  },
})
export const { setData } = photo.actions
export default photo.reducer
