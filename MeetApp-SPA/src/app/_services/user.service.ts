import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { API_BASE_URL } from '../config';


@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = API_BASE_URL;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id: number): Observable<User>{
  return this.http.get<User>(this.baseUrl + 'users/'+ id)
}


}
