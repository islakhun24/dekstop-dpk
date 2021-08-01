import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-smu',
  templateUrl: './smu.component.html',
  styleUrls: ['./smu.component.scss']
})
export class SmuComponent implements OnInit {
  id:any
  data :any = []
  detail:any = {}
  checkedList: any = []
  notchecked=false
  project:any = {}
  constructor(
    private apiService:ApiService,
    private activateRoute:ActivatedRoute,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.id = activateRoute.snapshot.paramMap.get('id')
    apiService.smu_list_checker(this.id).subscribe((data:any)=>{
      this.data = data
      this.detail = data[0]
    })

    apiService.project_detail(this.id).subscribe((data:any)=>{
      // console.log(data);
      this.project = data.data
    })
   }

  ngOnInit(): void {
    // $state.reload()
  }

  check(event: any, pos: any){
    if ( event.target.checked ) {
      this.checkedList.push(this.data[pos])
      }else{
        this.checkedList = this.checkedList.filter(( obj: any ) => {
          return obj.id !== this.data[pos].id;
        });
      }

  }

  save(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "data"   : encodeURIComponent(this.data),
      }
    };
    if(this.project.selesai!==3){
      return Swal.fire(
        'Btb belum selesai!',
        'Silahkan Tunggu sampai proses selesai!',
        'error'
      )
    }
    return this.router.navigate(['/checkers/document', this.id], { state: { data: JSON.stringify(this.checkedList)} });
    // console.log(this.checkedList);

  }

}
