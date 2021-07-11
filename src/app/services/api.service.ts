import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  //PROJECT:
  project_create(formdata: any){
    return this.http.post(`${base_url}main/projek/create`,formdata)
  }

  project_edit(formdata: any,id: number){
    return this.http.put(`${base_url}main/projek/edit/${id}`,formdata)
  }

  project_detail(id: number){
    return this.http.get(`${base_url}main/projek/detail/${id}`)
  }

  project_list(){
    return this.http.get(`${base_url}main/projek/list`)
  }

  project_delete(id: number){
    return this.http.delete(`${base_url}/main/projek/delete/${id}`)
  }


  //SMU:
  smu_create(formdata: any){
    return this.http.post(`${base_url}/main/smu/create`,formdata)
  }
  smu_edit(formdata: any,id: number){
    return this.http.put(`${base_url}/main/smu/edit/${id}`,formdata)
  }

  smu_detail(id: number){
    return this.http.get(`${base_url}/main/smu/detail/${id}`)
  }

  smu_list(){
    return this.http.get(`${base_url}/main/smu/list`)
  }

  smu_delete(id: number){
    return this.http.delete(`${base_url}/main/smu/delete/${id}`)
  }

  smu_dashboard(){
    return this.http.get(`${base_url}main/smu/dashboard`)
  }

  //CSD:
  csd_create(formdata: any){
    return this.http.post(`${base_url}/main/csd/create`,formdata)
  }
  csd_get(){
    return this.http.get(`${base_url}/main/csd/get`)
  }


  //Customer
  customer_list(){
    return this.http.get(`${base_url}main/customer/list`)
  }
}
