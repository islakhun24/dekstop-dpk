import { ApiService } from '../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})


export class DetailComponent implements OnInit {
  isLoading = false
  detail: any = {}
  invoice: any = []
  form:FormGroup
  customer: any
  data:any=[]
  smu:any = []
  isi_kiriman : any = []
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateROute : ActivatedRoute,
    private apiService:ApiService
  ) {
    this.form = fb.group({
      alamat:[''],
      no_hp:[''],
      isi_kiriman:['']
    })

    this.customer = activateROute.snapshot.paramMap.get('agen')
    apiService.invoice_detail(this.customer).subscribe(async (data: any)=>{

      this.isi_kiriman =  data.invoice.map( (v:any)=>{

        return v.nama_barang
      })


      this.detail = data.detail
      this.invoice = data.invoice
      this.smu = data.smu

      return await 0
    })



  }

  ngOnInit(): void {
  }
  save(){

  }
}
