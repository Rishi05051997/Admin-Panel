import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  
  // it will set the token into the local storage
  setToken(token: string){
    window.localStorage.setItem('jwt_token', token);
  }

  // it will get the token from backend\
  getToken(){
    return window.localStorage.getItem('jwt_token');
  }

  // if user logged out successfully then it will destoy the token

  destroyToken(){
    window.localStorage.removeItem('jwt_token');
  }
}
