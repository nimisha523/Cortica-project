import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http:HttpClient) { }

  public addStudent(data:any) : Observable<any>{
    return this.http.post('https://localhost:7222/api/StudentData',data);
  }

  public getStudentList() : Observable<any>{
    return this.http.get('https://localhost:7222/api/StudentData');
  }

  public deleteStudent(id:number): Observable<any>{
    return this.http.delete(`https://localhost:7222/api/StudentData/${id}`);
  }

  public updateStudent(id:number,data:any) : Observable<any>{
    return this.http.put(`https://localhost:7222/api/StudentData/${id}`,data);
  }
}
