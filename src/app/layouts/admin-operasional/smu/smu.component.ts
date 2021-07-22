import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-smu',
  templateUrl: './smu.component.html',
  styleUrls: ['./smu.component.scss']
})
export class SmuComponent implements OnInit {
  id:any
  data:any = []
  constructor(
    private activatedRoute:ActivatedRoute,
    private apiService: ApiService,
    private router:Router
  ) {
      this.id = activatedRoute.snapshot.paramMap.get('id')
      apiService.admin_smu(this.id).subscribe(data=>{
        console.log(data);
        this.data = data
      })
  }

  ngOnInit(): void {
  }
  accept(){
    Swal.fire({
      title: 'Approve data?',
      text: "Apakah anda ingin approve data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.apiService.admin_selesai({data: this.data},this.id).subscribe(data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil',
            showConfirmButton: false,
            timer: 1500
          }).then(data=>{
              this.router.navigate(['/admin-operasional/project'])
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
