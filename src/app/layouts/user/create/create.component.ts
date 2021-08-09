import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form:FormGroup
  level : any = "Superadmin"
  unit:any="Admin Operasional"
  constructor(
    private apiService:ApiService,
    private fb:FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({
      nama: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nama_akun: ['', Validators.required],
      nik: ['', Validators.required],
      alamat: ['', Validators.required],
      tgl_lahir: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }
  save(){
    let formdata = this.form.value
    formdata.unit = this.unit
    formdata.level = this.level
    console.log(formdata);

    this.apiService.user_create(formdata).subscribe((success:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil tambah user',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
       this.router.navigate(['/user'])

      })
    },(err:any)=>{
      console.log(err);

    })
  }
  levelChange(e:any){
    this.level = e.target.value
  }

  unitChange(e:any){
    this.unit  = e.target.value
  }
}
