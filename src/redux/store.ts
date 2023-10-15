import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '@/redux/Slices/todo-slice'
import photo from './Slices/photoSlice'
;('@/redux/Slices/addTodo')
export const store = configureStore({
  reducer: {
    todoReducer,
    photo,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
