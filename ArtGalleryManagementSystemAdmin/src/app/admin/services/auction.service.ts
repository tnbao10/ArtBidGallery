import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class AuctionService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    async rejectAuction(id:any){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL+'auction/rejectauction/'+id,id))
    }
    async auctionToProduct(id:any){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'auction/auctiontoproduct',id))
    }
    async auctionToProductCancle(id:any){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'auction/auctiontoproductcancle',id))
    }
    async addBidOrder(formData: FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'auction/addbidorder',formData))
    }
    
}