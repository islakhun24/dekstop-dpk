import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id:any
  form:FormGroup
  level : any
  unit:any
  detail:any = {}
  constructor(
    private activateRoute:ActivatedRoute,
    private apiService:ApiService,
    private router: Router,
    private fb:FormBuilder
  ) {
    this.form = fb.group({
      nama: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nama_akun: ['', Validators.required],
      tgl_lahir: ['', Validators.required],
    })

    this.id = activateRoute.snapshot.paramMap.get('id')
    apiService.user_detail(this.id).subscribe((data:any)=>{
      console.log(data);

      this.level = data.level
      this.unit = data.unit
      this.detail = data
    })
  }

  ngOnInit(): void {

  }
  save(){
    let formdata = this.form.value
    formdata.unit = this.unit
    formdata.level = this.level
    console.log(formdata);

    this.apiService.user_edit(this.id,formdata).subscribe((success:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil edit user',
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

  delete(){
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "ingin menghapus, "+ this.detail.nama_akun +"!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus !',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.user_delete(this.id).subscribe((success:any)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil hapus user',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.router.navigate(['/user'])

          })
        },(err:any)=>{
          console.log(err);

        })
      }
    })

  }
}
