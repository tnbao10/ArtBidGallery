import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class CartService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    async addToCart(cartItem:any){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'cart/addtocart',cartItem))
    }
    async innerCart(userid:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'cart/innercart/'+userid))
    }
    async deleteItem(id:number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BASE_URL+'cart/deleteitem/'+id))
    }
    async deleteallItem(cartid:number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BASE_URL+'cart/deleteallitem/'+cartid))
    }
    async createOrder(formdata:FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'cart/createorder',formdata))
    }
    async createPayment(formdata:FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'cart/createpayment',formdata))
    }
    async findallorder(userId:any){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'cart/findallorder/'+userId))
    }
    async findcartbyproductid(id:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'cart/findcartbyproductid/'+id))
    }
}