import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UsersService {
private baseUrl="https://localhost:7082/api/User"
  constructor(private http :HttpClient) { }
  
  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
}
delete(id:number|undefined,user:string): Observable<any[]> {
  console.log(`${this.baseUrl}${user}/${id}`)
  return this.http.delete<any[]>(`${this.baseUrl}/${id}`);
}
}
