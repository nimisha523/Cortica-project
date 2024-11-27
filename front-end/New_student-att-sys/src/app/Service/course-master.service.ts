import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseMasterService {
  // baseurl='https://localhost:7222/api/CourseMaster';

  constructor(private http:HttpClient) { }

  addCourse(data:any) : Observable<any>{
    return this.http.post('https://localhost:7222/api/CourseMaster',data);
  }

  getCourseList() : Observable<any>{
    return this.http.get<Course>('https://localhost:7222/api/CourseMaster');
  }

  deleteCourse(id:number): Observable<any>{
    return this.http.delete(`https://localhost:7222/api/CourseMaster/${id}`);
  }

  updateCourse(id:number,data:any) : Observable<any>{
    return this.http.put(`https://localhost:7222/api/CourseMaster/${id}`,data);
  }
}

export interface Course{
  id: string;
  name:string;
  description:string;
  fees:number;
}


// type CombinedType = Course & Trainer;