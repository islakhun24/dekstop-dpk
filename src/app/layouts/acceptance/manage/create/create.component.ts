import { ApiService } from './../../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form:FormGroup
  constructor(
    private fb : FormBuilder,
    private apisService:ApiService,
    private router:Router
  ) {
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

  ngOnInit(): void {
  }
  isLoading : boolean = false
  save(){
    const formdata = this.form.value
    // console.log(formdata);

    this.isLoading = true
    this.apisService.project_create(formdata).subscribe((success:any)=>{
      this.router.navigate(['/acceptance/list'])
    },(err:any)=>{
      console.log(err);

    })

  }

  change(e:any){
    this.form.patchValue({
      asal_tps: e.target.value
    })
  }
}
