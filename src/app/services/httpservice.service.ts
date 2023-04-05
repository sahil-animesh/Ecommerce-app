import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "src/constant";
import { API } from "src/api";
@Injectable({
    providedIn:'root'
})
export class HttpService {
    constructor(private http:HttpClient){}

    postLoginData(data:any) {
        return this.http.get(`${url}${API.auth.Login_API}.json`);
    }
    postRegisterData(data:any) {
        return this.http.post(`${url}${API.auth.REGISTER_API}.json`,data);
    }
}