import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  public Login(currentData:any){
    sessionStorage.setItem("admin",currentData);
  }

  
}
