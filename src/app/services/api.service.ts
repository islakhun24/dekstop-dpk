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
  project_get(){
    return this.http.get(`${base_url}main/projek/get`)
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
  smu_checker(formdata: any){
    return this.http.post(`${base_url}main2/smu/checker`,formdata)
  }
  smu_list_checker(id:any){
    return this.http.get(`${base_url}main2/smu/list_checker/${id}`)
  }
  smu_list_project(id:any){
    return this.http.get(`${base_url}main2/smu/list_reject/${id}`)
  }
  smu_approval_reject(formdata: any){
    return this.http.post(`${base_url}main2/smu/approval_reject`,formdata)
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

  customer_create(formdata:any){
    return this.http.post(`${base_url}main/customer/create`,formdata)
  }

  customer_detail(id:any){
    return this.http.get(`${base_url}main/customer/detail/${id}`)
  }

  customer_edit(id:any, formdata:any){
    return this.http.put(`${base_url}main/customer/edit/${id}`, formdata)
  }

  customer_delete(id:any){
    return this.http.delete(`${base_url}main/customer/delete/${id}`)

  }

  //Harga

  harga_get_data(){
    return this.http.get(`${base_url}main/harga/get_data`)
  }

  harga_history(){
    return this.http.get(`${base_url}main/harga/history`)
  }

  harga_create(formdata:any){
    return this.http.post(`${base_url}main/harga/create`, formdata)
  }

  //User

  user_list(){
    return this.http.get(`${base_url}main/user/list`)

  }

  user_create(formdata:any){
    return this.http.post(`${base_url}main/user/create`, formdata)
  }
  user_detail(id:any){
    return this.http.get(`${base_url}main/user/detail/${id}`)

  }

  user_edit(id:any, formdata:any){
    return this.http.put(`${base_url}main/user/edit/${id}`, formdata)
  }
  user_delete(id:any){
    return this.http.delete(`${base_url}main/user/delete/${id}`)

  }
}
