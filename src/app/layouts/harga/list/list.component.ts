import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  harga:any
  history:any
  show:boolean = false
  isList : boolean = true
  form:FormGroup
  constructor(
    private apiService:ApiService,
    private fb:FormBuilder
  ) {
    this.form = fb.group({
      harga:['',Validators.required]
    })
    apiService.harga_get_data().subscribe(data=>{
      if(data==null){
       show     :true
      }else{
        this.harga = data
        show:false
      }
      console.log("harga", data);
      this.isList = false
    },err=>{
      this.isList = false
      console.log(err);

    })

    apiService.harga_history().subscribe(data=>{
      this.history = data
      console.log(this.history);

      this.isList = false
    },err=>{
      this.isList = false
      console.log(err);

    })
   }

  ngOnInit(): void {
  }
  isLoading : boolean = false
  save(){
    let formdata = this.form.value
    this.apiService.harga_create(formdata).subscribe((success:any)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil tambah harga',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        window.location.reload();

      })
    },(err:any)=>{
      console.log(err);

    })
  }
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
}
