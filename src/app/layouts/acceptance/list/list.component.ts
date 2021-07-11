import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  projects:any = {}
  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.project_list().subscribe((data:any)=>{
      // console.log(data);

      this.projects = data.data
    })
  }

}
