import  Swal  from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss']
})
export class CheckerComponent implements OnInit {
  id:any
  data :any = []
  detail:any = {}
  form:FormGroup
  details: any = {};
  project:any = {}
  message:any =''
  ischecker = false
  constructor(
    private apiService:ApiService,
    private activateRoute:ActivatedRoute,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.form = fb.group({
      berat: ['']
    })
    this.id = activateRoute.snapshot.paramMap.get('id')
    setInterval(()=>{
      this.fetchData()
    }, 3000)
    this.apiService.project_detail(this.id).subscribe(((data: any)=>{
      this.details = data.data;

    }));
  }

  fetchData(){
    this.apiService.smu_list_checker(this.id).subscribe((data:any)=>{
      this.data = data
      this.detail = data[0]
      console.log(this.data);

    })
    this.apiService.project_detail(this.id).subscribe((data:any)=>{
      this.project = data.data

      if(this.project.selesai==0){
        this.message = 'Tugas dengan nomor '+this.project.no+' masih di proses  acceptance'
      }
      if(this.project.selesai==1){
        this.message = 'Tugas dengan nomor '+this.project.no+' selesai diproses  acceptance'
      }
    })
  }
  ngOnInit(): void {

  }
  click(i:any){
    if(i!==0){

      this.detail = this.data[i]
    }
  }
  change(){
   this.ischecker = !this.ischecker
  }

  save(){
    let checker = 0
    if(this.ischecker){
      checker = 1
    }else{
      checker = 2
    }

    if(parseInt(this.detail.checker)!==0){
      Swal.fire(
        'Pengecekan telah selesai!',
        'Silahkan reject barang jika ada yang perlu di reject!',
        'success'
      )
    }

    let fomdata = this.form.value
    fomdata.berat_awal = fomdata.berat
    fomdata.berat_recharge_cargo = 0
    fomdata.berat_total = fomdata.berat
    fomdata.checker = checker
    fomdata.id = this.detail.id
    fomdata.project_id = this.id
    if(fomdata.berat==0 || fomdata.berat==''){
      return Swal.fire(
        'Data tidak boleh 0!',
        'Silahkan Periksa kembali!',
        'success'
      )
    }

    return this.apiService.smu_checker(fomdata).subscribe((data:any)=>{
      this.form.reset()
      this.data = data
      this.detail = data[0]
    })
  }


  selesai(){
    Swal.fire({
      title: 'Apakah selesai?',
      text: "Apakah Proses BTB anda telah selesai!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Selesai'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.apiService.btb_selesai(this.id).subscribe(data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil',
            showConfirmButton: false,
            timer: 1500
          }).then(data=>{
              this.router.navigate(['/btb/list'])
          })

        }, err=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }
    })

  }
}
