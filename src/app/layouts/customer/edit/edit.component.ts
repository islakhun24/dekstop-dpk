import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  Swal  from 'sweetalert2';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id:any
  customer:any
  form:FormGroup
  constructor(
    private activatedRoute:ActivatedRoute,
    private apiService:ApiService,
    private router:Router,
    private fb : FormBuilder
  ) {
    this.form = fb.group({
      customer: ['', Validators.required],
      nohp: ['', Validators.required],
      alamat: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.apiService.customer_detail(this.id).subscribe((data:any)=>{
      console.log(data);
      this.customer = data.data
    })
  }
  delete(nama:any){
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "ingin menghapus, "+ nama +"!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus !',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.customer_delete(this.id).subscribe((success:any)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil hapus customer',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.router.navigate(['/customer'])

          })
        },(err:any)=>{
          console.log(err);

        })
      }
    })

  }

  edit(){
    let formdata = this.form.value
    this.apiService.customer_edit(this.id,formdata).subscribe((success:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil edit customer',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['/customer'])

      })
    },(err:any)=>{
      console.log(err);

    })
  }
}
