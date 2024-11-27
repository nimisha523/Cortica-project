import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchMasterService {
  constructor(private http:HttpClient) { }

  public addBatch(data:any) : Observable<any>{
    return this.http.post('https://localhost:7222/api/BatchMaster',data);
  }

  public getBatchsList() : Observable<any>{
    return this.http.get(`https://localhost:7222/api/BatchMaster`);
  }

  public deleteBatch(id:number): Observable<any>{
    return this.http.delete(`https://localhost:7222/api/BatchMaster/${id}`);
  }

  public updateBatch(id:number,data:any) : Observable<any>{
    return this.http.put(`https://localhost:7222/api/BatchMaster/${id}`,data);
  }
}
