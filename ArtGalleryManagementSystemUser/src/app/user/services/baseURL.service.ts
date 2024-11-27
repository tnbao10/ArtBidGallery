import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BaseURLService{
    public BASE_URL = 'http://localhost:5204/api/';
    public IMAGE_URL = 'http://localhost:5204/images/'
}