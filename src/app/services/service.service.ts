import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public api:HttpClient) {   }
  Url="https://localhost:7090/api/"
  
  public async GetData (endpoint: String){
    await this.api.get(this.Url+endpoint).toPromise().then((res =>{
      console.log(res);
    }))
  }
}
