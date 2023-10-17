import { IPhoto, IPhotoStat } from '@/Types/Type'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: IPhotoStat = {
  data: [],
  displayedData: [],
  totalPage: 0,
  categories: [],
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const photos = []

  try {
    const response: any = await axios.get(
      'https://api.unsplash.com/photos/random',
      {
        params: {
          client_id: 'ioeNa9wb88jQFAjFYBruioS7nbPxEonSA_cZzR0zNug',
          count: 30,
        },
      }
    )
    const data = response.data.map((item: any) => {
      return {
        id: item.id,
        description: item.alt_description,
        image: item.urls.small,
        category: item.topic_submissions
          ? Object.keys(item.topic_submissions)
          : [],
      }
    })

    photos.push(...data)
  } catch (error) {
    console.error('Ошибка при получении фотографий:', error)
  }
  return photos
})
export const photo = createSlice({
  name: 'photo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state: IPhotoStat, action) => {
      state.data.push(...action.payload)
      state.totalPage = Math.ceil(state.data.length / 12)
      const categories: string[] = Array.from(
        new Set(state.data.flatMap((photo) => photo.category || []))
      ).sort()
      state.categories = categories
    })
  },
  reducers: {
    setData: (state, action: PayloadAction<IPhoto[]>) => {
      state.displayedData = action.payload
    },
    setSearch: (state, action) => {
      state.displayedData =
        action.payload === 'All'
          ? state.data.slice(1, 12)
          : state.data.filter((i) => i.category?.includes(action.payload))
    },
    getOnePhoto: (state, action) => {
      state.displayedData = state.data.filter((i) =>
        i.id?.includes(action.payload)
      )
    },
    sortData: (state, action: PayloadAction<string>) => {
      if (action.payload === 'asc') {
        state.displayedData = [...state.displayedData].sort((a, b) =>
          a.description.localeCompare(b.description)
        )
      } else if (action.payload === 'desc') {
        state.displayedData = [...state.displayedData].sort((a, b) =>
          b.description.localeCompare(a.description)
        )
      }
    },
  },
})
export const { setData, setSearch, getOnePhoto, sortData } = photo.actions
export default photo.reducer
