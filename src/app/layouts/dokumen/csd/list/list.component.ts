import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data : any = []
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.csd_past_check_list().subscribe(data=>{
      console.log(data);
      this.data = data
    })
  }



}
