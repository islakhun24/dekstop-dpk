import { ApiService } from './../../../../services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.component.html',
  styleUrls: ['./riwayat.component.scss']
})
export class RiwayatComponent implements OnInit {
  data : any = []
  isList = true
  constructor(
    private apiService:ApiService,
    private router: Router
  ) {
    apiService.invoice_history().subscribe(data=>{
      this.data = data
      this.isList = false
    })
  }

  ngOnInit(): void {
  }
  tanggal(str:any){
    const dates = str.split(' ')

    return dates[0]
  }
}
