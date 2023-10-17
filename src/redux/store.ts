import { configureStore } from '@reduxjs/toolkit'
import photo from './Slices/photoSlice'
;('@/redux/Slices/addTodo')
export const store = configureStore({
  reducer: {
    photo,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
