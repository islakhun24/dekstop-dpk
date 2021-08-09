import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isList= false
  teams:any = []
  users:any = []
  status: number = 0
  id:any
  wewenang: any
  keterangan:any
  id_user:any
  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.team().subscribe((data:any)=>{
      this.teams = data
    })
    this.apiService.team_tampil().subscribe((data:any)=>{
      console.log(data);
      this.users = data
    })
    this.apiService.team_tampil_pertimn(this.id).subscribe((data:any)=>{
      console.log(data);
      this.users = data
    })
  }
  clickStatus(status:any, id:any){
    this.status = status

    if(status === 0){
      this.apiService.team_tampil().subscribe((data:any)=>{
        console.log(data);
        this.users = data
      })
    }else{
      this.apiService.team_tampil_pertimn(id).subscribe((data:any)=>{
        console.log(data);
        this.users = data
      })
    }
  }
  hapus(id:any, nama:any){
    Swal.fire({
      title: `Apakah anda ingin menghapus ${nama} dari tim?`,
      showDenyButton: false,
      showCancelButton: true,
      showCloseButton:false,
      confirmButtonText: `Hapus`,
      cancelButtonText: `Tidak`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apiService.hapus_tim(id).subscribe((data:any)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil !',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.ngOnInit()
          })
        },err=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal !',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }
    })

  }
  showModal = false;
  toggleModals(id: any,  id_user: any){
    this.showModal = !this.showModal;
    this.id = id
    this.keterangan = 'Digantikan oleh '
    this.id_user = id_user
  }
  toggleModal(){
    this.showModal = !this.showModal;

  }
  levelChange(e:any, id:any, nama:any){
    Swal.fire({
      title: 'Masukan kedalam tim?',
      text: `Apakah anda ingin memasukan ${nama} kedalam tim?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText:'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.ganti_team(id, e.target.value ).subscribe(data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil !',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.ngOnInit()
          })
        },err=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal !',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    })
  }

  userCheck(e:any){
    this.id_user = e.target.value
  }

  submit(){
    this.apiService.cover_tim({
      id: this.id,
      keterangan: 'Diganti Oleh ',
      id_user :this.id_user
    }).subscribe(data=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil !',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.ngOnInit()
      })
    },err=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Gagal !',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }
}
