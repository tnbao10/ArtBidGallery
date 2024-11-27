import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class AdminService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    // async siginWithGG(formData:FormData){
    //     return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'user/siginwithgg',formData))
    // }
    async createuserseller(formData: FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL + 'admin/createuserseller', formData));
    }
    async deleteuserseller(formData: FormData){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL + 'admin/delete', formData));
    }
    async changerole(formData: FormData){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL + 'admin/changerole', formData));
    }
    // async findbyemail(email: string){
    //     return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'user/findbyemail/'+email));
    // }
    async findbyid(userid: any){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'user/findbyid/'+userid));
    }
    // async login(email: string, password:string){
    //     return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL + 'user/login/',{email,password}));
    // }
    async findalluser(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'admin/findalluser'));
    }
    async findallseller(){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'admin/findallseller'));
    }
}