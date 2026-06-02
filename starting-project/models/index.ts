export type Product = {
  id: string
  title: string
  description: string
}

export interface Data {
  products: Product[]
}

export type User = {
  id: string
  name: string
  email: string
}

export type Sale = {
  id: string
  username: string
  volume: number
}