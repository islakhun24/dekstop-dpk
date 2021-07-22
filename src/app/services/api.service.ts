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
  checker_get(){
    return this.http.get(`${base_url}main2/checker/get`)
  }
  acceptance_get(){
    return this.http.get(`${base_url}main2/projek/acceptance`)
  }

  acceptance_selesai(id:any){
    return this.http.get(`${base_url}main2/projek/acceptance/selesai/${id}`)
  }
  btb_get(){
    return this.http.get(`${base_url}main2/projek/btb`)
  }
  btb_selesai(id:any){
    return this.http.get(`${base_url}main2/projek/btb/selesai/${id}`)
  }
  btb_reject(id:any){
    return this.http.get(`${base_url}main2/projek/btb/reject/${id}`)
  }
  admin_get(){
    return this.http.get(`${base_url}main2/projek/admin`)
  }
  admin_smu(id:any){
    return this.http.get(`${base_url}main2/projek/admin/smu/${id}`)
  }
  admin_selesai(formdata:any, id:any){
    return this.http.put(`${base_url}main2/projek/admin/smu/${id}`,formdata)
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
  smu_list2(id: any){
    return this.http.get(`${base_url}main2/smu/list/${id}`);
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
    return this.http.post(`${base_url}main2/csd/create`,formdata)
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

  invoice_list(){
    return this.http.get(`${base_url}main2/document/invoice`)

  }
  invoice_detail(agen: any){
    return this.http.get(`${base_url}main2/document/invoice/${agen}`)

  }

  cetak_invoice(data:any){
    return this.http.post(`${base_url}main2/document/invoice/cetak`, data)

  }
  invoice_history(){
    return this.http.get(`${base_url}main2/document/invoices/history`)

  }

  csd_past_check_list(){
    return this.http.get(`${base_url}main2/document/csd/past_check_list`)
  }
  csd_detailt(id: any){
    return this.http.get(`${base_url}main2/document/csd/detail/${id}`)
  }
  smu_create2(formdata: any){
    return this.http.post(`${base_url}main2/smu/create`,formdata)
  }

  suggest_smu(formdata: any){
    return this.http.post(`${base_url}main2/suggestion/smu`,formdata)
  }
  suggest_customer(formdata: any){
    return this.http.post(`${base_url}main2/suggestion/customer`,formdata)
  }
  suggest_barang(formdata: any){
    return this.http.post(`${base_url}main2/suggestion/barang`,formdata)
  }

  invoice_print(agen:any, noinvoice:any){
    return this.http.put(`${base_url}main2/invoice/detail/${agen}`,{noinvoice: noinvoice})
  }
}
