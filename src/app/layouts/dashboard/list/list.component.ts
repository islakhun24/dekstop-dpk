import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) {
    apiService.smu_dashboard().subscribe((data:any)=>{
      console.log(data);

    })
  }

  ngOnInit() {
  }

}
