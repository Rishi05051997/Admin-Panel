import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


const BASE_URL = 'http://localhost:3000/api'
@Injectable({
  providedIn: 'root'
  
})
export class AssociateService {

  constructor( private http: HttpClient) { }

  getAssociates(){
    return this.http.get(`${BASE_URL}/associates`);
  }

  createAssociate(body:any) {
    return this.http.post(`${BASE_URL}/associates`, body)
  }

  deleteAssociate(id:string){
    return this.http.delete(`${BASE_URL}/associates/${id}`)
  }

  getAssociateById(id:string){
    return this.http.get(`${BASE_URL}/associates/${id}`)
  }

  getUpdateAssociate(id:string, body:any){
    return this.http.put(`${BASE_URL}/associates/${id}`, body)

  }
}
