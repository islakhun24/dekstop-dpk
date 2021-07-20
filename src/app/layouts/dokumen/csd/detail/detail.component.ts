import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  isLoading = false
  form:FormGroup
  id: any
  detail: any = {}
  constructor(
    private fb : FormBuilder,
    private apiService: ApiService,
    private activateRoute: ActivatedRoute
  ) {
    this.form = fb.group({

    })
    this.id = activateRoute.snapshot.paramMap.get('id')
    apiService.csd_detailt(this.id).subscribe(data=>{
      this.detail = data
      console.log(data);

    })
   }

  ngOnInit(): void {
  }

}
