import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class WishlistService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    async addToWishList(formdata:any){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'wishlist/addtowishlist',formdata))
    }
    async findallwishlist(userid:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'wishlist/findallwishlist/'+userid))
    }
    async deleteItem(id:number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BASE_URL+'wishlist/deleteitem/'+id))
    }
    async deleteallItem(cartid:number){
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BASE_URL+'cart/deleteallitem/'+cartid))
    }
}