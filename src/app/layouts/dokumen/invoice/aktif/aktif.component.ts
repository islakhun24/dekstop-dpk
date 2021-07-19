import { ApiService } from '../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aktif',
  templateUrl: './aktif.component.html',
  styleUrls: ['./aktif.component.scss']
})
export class AktifComponent implements OnInit {
  data : any = []
  constructor(
    private apiService:ApiService,
    private router: Router
  ) {
    apiService.invoice_list().subscribe(data=>{
      this.data = data

    })
  }

  ngOnInit(): void {
  }

}
