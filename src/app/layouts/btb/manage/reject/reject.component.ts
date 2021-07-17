import { ApiService } from './../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.scss']
})
export class RejectComponent implements OnInit {
  id:any
  data :any = []
  detail:any = {}
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.id = activateRoute.snapshot.paramMap.get('id')
    this.apiService.smu_list_project(this.id).subscribe((data:any)=>{
      this.data = data
      this.detail = data[0]

    })
  }

  ngOnInit(): void {

  }

}
