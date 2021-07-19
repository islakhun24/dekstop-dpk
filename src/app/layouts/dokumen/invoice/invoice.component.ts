import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  isClick = true
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  click(is: boolean){
    this.isClick = is

    if( this.isClick===true){
      this.router.navigate(['/dokumen/invoice/aktif'])
    }
    if(this.isClick===false){
      this.router.navigate(['/dokumen/invoice/riwayat'])
    }
  }


}
