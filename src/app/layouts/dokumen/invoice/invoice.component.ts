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
    const url = this.router.url;
    if(url.includes('/dokumen/invoice/aktif')){
      this.isClick =true
    }
    if(url.includes('/dokumen/invoice/riwayat')){

      this.isClick = false
    }
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
