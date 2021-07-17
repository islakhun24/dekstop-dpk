import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(
    private apiService:ApiService,
    private activateRoute:ActivatedRoute,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.id = activateRoute.snapshot.paramMap.get('id')
    apiService.smu_list_checker(this.id).subscribe((data:any)=>{
      console.log(data);

      this.data = data
      this.detail = data[0]
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
    this.router.navigate(['/checkers/document', this.id], { state: { data: JSON.stringify(this.checkedList)} });
    // console.log(this.checkedList);

  }

}
