import { ProductAttribute } from "./productattribute"

export class ProductWithAttributes{
    id:number
    sellerId: number
    name:string
    description:string
    categoryId:number
    price:number
    quantity:number
    image:string
    createdAt:string
    deletedAt:string
    username: string
    avatar:string
    productAttributes: ProductAttribute[]
}