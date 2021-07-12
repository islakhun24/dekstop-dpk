import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form:FormGroup
  customers:any
  isList : boolean = true
  constructor(
    private fb:FormBuilder,
    private apiService:ApiService,
    private router:Router
  ) {
    apiService.customer_list().subscribe((data:any)=>{
      this.isList = false
      this.customers = data.data


    },err=>{
      console.log(err);
      this.isList = false
    })
    this.form = fb.group({
      customer: ['', Validators.required],
      nohp: ['', Validators.required],
      alamat: ['', Validators.required]
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
    let formdata = this.form.value
    this.apiService.customer_create(formdata).subscribe((success:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil tambah customer',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        window.location.reload();

      })
    },(err:any)=>{
      console.log(err);

    })
  }
  reLoad(){
    this.router.navigate([this.router.url])
  }
}

