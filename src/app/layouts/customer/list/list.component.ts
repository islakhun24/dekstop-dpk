import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form:FormGroup
  customers:any
  constructor(
    private fb:FormBuilder,
    private apiService:ApiService
  ) {
    apiService.customer_list().subscribe((data:any)=>{
      this.customers = data.data
      console.log(data);

    })
    this.form = fb.group({
      tanggal: ['', Validators.required],
      no: ['', Validators.required],
      no_polisi_kendaraan: ['', Validators.required],
      nama_pengemudi: ['', Validators.required],
      asal_tps: ['', Validators.required],
      kota_asal: ['', Validators.required],
      kota_tujuan: ['', Validators.required]
    })
   }

  ngOnInit() {
  }
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
  isLoading : boolean = false
  save(){

  }
}
