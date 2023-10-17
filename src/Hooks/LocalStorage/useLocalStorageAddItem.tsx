import { useState } from 'react'
interface DataItem {
  description: string
  image: string
  id: string
}

export function useLocalStorage(key: string) {
  const initialData: DataItem[] = JSON.parse(localStorage.getItem(key) || '[]')

  const [data, setData] = useState<DataItem[]>(initialData)
  const setLocalStorageData = (newData: DataItem) => {
    const initialData: DataItem[] = JSON.parse(
      localStorage.getItem(key) || '[]'
    )
    const updatedData = [...initialData, newData]

    setData(updatedData)
    localStorage.setItem(key, JSON.stringify(updatedData))
  }
  const setRemveLocalStorageData = (id: string) => {
    localStorage.setItem(key, JSON.stringify(data.filter((i) => i.id !== id)))
  }
  return {
    data,
    setRemveLocalStorageData,
    setLocalStorageData,
  }
}
