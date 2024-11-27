import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./baseURL.service";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(
        private httpClient: HttpClient,
        private baseUrlService : BaseURLService
    ){}
    async siginWithGG(formData:FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL+'user/siginwithgg',formData))
    }
    async register(formData: FormData){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL + 'user/register', formData));
    }
    async findbyemail(email: string){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'user/findbyemail/'+email));
    }
    async findbyid(userid: any){
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BASE_URL + 'user/findbyid/'+userid));
    }
    async editprofile(formData: any){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL + 'user/editprofile',formData));
    }
    async login(email: string, password:string){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL + 'user/login/',{email,password}));
    }
    async sendmail(email: string){
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BASE_URL + 'user/send-reset-mail/',{email}));
    }
    async resetpass(formData: FormData){
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BASE_URL + 'user/reset-password', formData));
    }
}