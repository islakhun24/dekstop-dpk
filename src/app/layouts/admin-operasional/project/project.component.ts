import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  show : boolean = true
  project:any = {}
  isList : boolean = true
  constructor(
    private apiService:ApiService
  ) {
    setInterval(()=>{
      this.fetchData()
    },3000)
  }

  ngOnInit(): void {

  }

  fetchData(){
    this.apiService.admin_get().subscribe((data:any)=>{
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
}
