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
    async FindAllAuction(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'auction/findallauction'))
    }
    async FindAuctionById(id:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'auction/findauctionbyid/'+id))
    }

    async CreateBidOrderUser(bidorderuser:any){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'auction/createbidorderuser',bidorderuser))
    }
    async FindAllBidOrderUserById(id:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'auction/findallbidorderuserbyid/'+id))
    }
    async UpdateBidOrder(bidOrderDto:any){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'auction/updatebidorder',bidOrderDto))
    }
}