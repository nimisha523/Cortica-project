import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  // baseurl='https://localhost:7222/api';

  constructor(private http:HttpClient) { }

  public addUser(data:any) : Observable<any>{
    //return this.http.post('https://localhost:7222/api/UserMaster',data);
    return this.http.post('https://localhost:7222/api/UserMaster',data);
  }

  public getUserList() : Observable<any>{
    return this.http.get<Trainer>('https://localhost:7222/api/UserMaster');
  }

  public deleteUser(id:number): Observable<any>{
    return this.http.delete(`https://localhost:7222/api/UserMaster/${id}`);
  }

  public updateUser(id:number,data:any) : Observable<any>{
    return this.http.put(`https://localhost:7222/api/UserMaster/${id}`,data);
  }
}

export interface Trainer{
  firstName: string;
    lastName: string;
    address: string;
    phoneNo: number;
    email: string;
    subject: string;
}