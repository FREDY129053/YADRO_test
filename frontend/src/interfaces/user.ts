export interface IUser {
  name: string,
  surname: string,
  gender: "female" | "male",
  phone: string,
  email: string,
  street_number: number,
  street_name: string,
  small_avatar: string,
  id: number,
  city: string,
  country: string,
  big_avatar: string
}

interface IPageData {
  page: number
  size: number
  total: number
}

export interface AllResult {
  users: IUser[]
  info: IPageData
}
