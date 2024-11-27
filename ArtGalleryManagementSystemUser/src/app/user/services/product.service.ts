
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    async findall(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findallproduct'))
    }
    async findallwithseller(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findallproductwithseller'))
    }
    async sortbyprice(min:number, max:number){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'home/sortbyprice',{min,max}))
    }
    async sortbypricelowhigh(value:string, min:number, max:number){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'home/sortbypricelowhigh',{value,min,max}))
    }
    async searchByKeyword(value:string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/searchbykeyword/'+value))
    }
    async findProductId(productId:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findproductbyid/'+productId))
    }
    async findProductIdWithSeller(productId:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findproductbyidwithseller/'+productId))
    }
    async findProductIdWithAttributes(productId:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findproductbyidwithattributes/'+productId))
    }
    async postart(formData:FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'home/createrart',formData))
    }
    async editart(formData:FormData){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL+'home/editart',formData))
    }
    async findallcategory(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findallcategory'))
    }
    async findbycategoryid(id:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findbycategoryid/'+id))
    }
    async findallbyseller(id:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findallbyseller/'+id))
        
    }
    async findbyid(id:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findproductbyid/'+id))
    }
    async addreview(formdata:any){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'home/addreview',formdata))
    }
    async findreviewbyproId(proId:number,userId:number,createdAt:string){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'home/findreviewbyproId',{proId,userId,createdAt}))
    }
    async findreviewbyuserid(userId:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findreviewbyuserid/'+userId))
    }
    async findallreview(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findallreview'))
    }
    async findallreviewbyproid(proId:number){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL+'home/findallreviewbyproid/'+proId))
    }
    async deleteproduct(formData:FormData){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL + 'home/delete', formData));
    }
}