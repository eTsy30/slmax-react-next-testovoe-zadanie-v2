export interface IPhoto {
  id: string
  description: string
  image: string
  category?: Array<string>
}
export interface IPhotoStat {
  data: Array<IPhoto>
  displayedData: Array<IPhoto>
  totalPage: number
  categories: string[]
}
export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
