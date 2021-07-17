import  Swal  from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  ischecker = false
  constructor(
    private apiService:ApiService,
    private activateRoute:ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      berat: ['']
    })
    this.id = activateRoute.snapshot.paramMap.get('id')
    apiService.smu_list_checker(this.id).subscribe((data:any)=>{
      console.log(data);

      this.data = data
      this.detail = data[0]
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

    if(this.detail.checker!==0){
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

    this.apiService.smu_checker(fomdata).subscribe((data:any)=>{
      this.data = data
      this.detail = data[0]
    })
  }
}
