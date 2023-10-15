export interface IPhoto {
  id?: string
  description: string
  image: string
}
export interface IPhotoStat {
  data: Array<IPhoto>
}
