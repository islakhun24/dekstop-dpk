import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from './../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.scss']
})
export class RejectComponent implements OnInit {
  id:any
  data :any = []
  detail:any = {}
  form:FormGroup
  berat_awal:any
  berat_total:any
  errs=false
  ischecker = false
  constructor(
    private apiService:ApiService,
    private activateRoute:ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({
      berat: ['']
    })
    this.id = activateRoute.snapshot.paramMap.get('id')
    setInterval(()=>{
      this.fetchData()
    },3000 )
  }

  fetchData(){
    this. apiService.btb_reject(this.id).subscribe((data:any)=>{
      this.data = data
      this.detail = data[0]
      this.berat_awal = this.detail.berat_awal
      this.berat_total = this.detail.berat_total
    })
  }
  ngOnInit(): void {

  }
  keyup(e: any){
    let num = e.target?.value
    if(num > this.detail.berat_total){
      this.errs=true
    }else{
      this.errs=false
      this.berat_total = this.berat_awal - num
    }

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
    let checker = 3


    let fomdata = this.form.value
    fomdata.berat_awal = this.detail.berat_awal
    fomdata.berat_recharge_cargo = fomdata.berat
    fomdata.berat_total = this.detail.berat_awal - fomdata.berat
    fomdata.checker = checker
    fomdata.id = this.detail.id
    fomdata.project_id = this.id

    this.apiService.smu_checker(fomdata).subscribe((data:any)=>{
      this.form.reset()
      this.apiService.btb_reject(this.id).subscribe((data:any)=>{
        if(data.length > 0){
          this.data = data
          this.detail = data[0]
          this.berat_awal = this.detail.berat_awal
          this.berat_total = this.detail.berat_total
        }else{
          this.data = []
          this.detail = {}
        }

      })
    })
  }
  selesai(){
    this.router.navigate(['/btb/manage/checker', this.id])
  }

}
