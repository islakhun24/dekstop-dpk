import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  show : boolean = true
  project:any = {}
  isList : boolean = true
  constructor(
    private apiService:ApiService
  ) {
    this.apiService.checker_get().subscribe((data:any)=>{

      this.project = data.data
      this.isList = false

      if(data.status==0){

        this.show = false
      }
      if(data.status==1){
        this.show = true
      }
    },err=>{
      console.log(err);
      this.isList = false

    })
  }

  ngOnInit(): void {

  }

}
