/* eslint-disable react/jsx-key */
'use client'

import { useAppDispatch, useAppSelector } from '@/redux/Hooks/hook'
import { fetchPosts } from '@/redux/Slices/photoSlice'
import { addTodo, removeTodo, toggleTodo } from '@/redux/Slices/todo-slice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { IPhoto } from '@/Types/Type'
function TodoList() {
  const todoList = useAppSelector((state: RootState) => state.todoReducer.list)
  const data = useAppSelector((state: RootState) => state.photo)
  const dispatch = useAppDispatch()

  const [todo, setTodo] = React.useState('')
  console.log(data.data, 'www')

  const handleSubmit = () => {
    dispatch(
      addTodo({
        id: Date.now(),
        name: todo,
        done: false,
      })
    )
    setTodo('')
  }

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id))
  }

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id))
  }

  return (
    <div>
      {data.data.map((i: IPhoto) => {
        return (
          <>
            <Image
              src={i.image}
              alt="Next.js Logo"
              width={550}
              height={450}
              priority
            />
          </>
        )
      })}
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={handleSubmit}>Add</button>
      {todoList.map((todo) => {
        return (
          <div key={todo.id} className="flex">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.name}

            <button onClick={() => handleDelete(todo.id)} className="ml-auto">
              🗑️
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default TodoList
