import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cetak',
  templateUrl: './cetak.component.html',
  styleUrls: ['./cetak.component.scss']
})
export class CetakComponent implements OnInit {
  customer: any
  isLoading =false
  invoice:any = []
  constructor(
    private activateRoute: ActivatedRoute
  ) {
    this.customer = activateRoute.snapshot.paramMap.get('agen')
  }

  ngOnInit(): void {
  }
  save(){
    this.isLoading = true
  }
}
