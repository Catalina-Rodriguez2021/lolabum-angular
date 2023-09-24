import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public api:HttpClient) {   }
  Url="https://localhost:7090/api/"
  
  public async GetData (endpoint: String){
    var response;
    await this.api.get(this.Url+endpoint).toPromise().then((res =>{
      response = res;
    }))
    return response;
  }

  public async PostData (endpoint: String, body: String){
    return await this.api.post(this.Url+endpoint, body).subscribe((res =>{}))
  }

  public async DeleteData(endpoint: string, id: string){
    return await this.api.delete(this.Url+endpoint+"/"+id)
  }

  public async updateData(endpoint:string,id:string,body:string){
    return await this.api.put(this.Url+endpoint + "/" + id,body)
  }
}
