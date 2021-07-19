import { ApiService } from '../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  no_invoice: any
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
    this.no_invoice = activateROute.snapshot.paramMap.get('no_invoice')
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
    let data :any = {}
    data.detail = this.detail
    data.invoice = this.invoice
    data.smu = this.smu
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Anda yakin ingin invoice "+ this.customer + ' !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Setuju!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.cetak_invoice({data:data, no_invoice: this.no_invoice}).subscribe(data=>{
          console.log(data);
          Swal.fire(
            'Berhasil!',
            'invoice '+this.customer+' diriwayatkan',
            'success'
          ).then(()=>{
            this.router.navigate(['/dokumen/invoice/riwayat'])
          })
        }, (err:any)=>{
          Swal.fire(
            'Gagal!',
            'invoice '+this.customer+' gagal riwayatkan',
            'error'
          )
        })

      }
    })


  }
}
