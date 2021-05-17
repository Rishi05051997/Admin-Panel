import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:4000/api"
  constructor(
    private http: HttpClient
  ) { }

  loginUser(user: User){
    return this.http.post(`${this.baseUrl}/login`, user)
  }
}
