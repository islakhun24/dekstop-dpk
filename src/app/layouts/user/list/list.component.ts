import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users:any

  isList : boolean = true
  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.user_list().subscribe(data=>{
      // console.log(data);
      this.users = data

      this.isList= false
    },err=>{
      console.log(err);
      this.isList= false
    })
  }

}
