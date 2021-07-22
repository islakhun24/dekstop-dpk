import { ApiService } from './../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-cetak',
  templateUrl: './cetak.component.html',
  styleUrls: ['./cetak.component.scss']
})
export class CetakComponent implements OnInit {
  customer: any
  no_invoice:any
  isLoading =false
  invoice:any = []
  data:any ={}
  invoices:any ={}
  customers:any ={}
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.customer = activateRoute.snapshot.paramMap.get('agen')
    this.no_invoice = activateRoute.snapshot.paramMap.get('no_invoice')
    apiService.invoice_print(this.customer,this.no_invoice).subscribe((data: any)=>{
      this.data = data;
      this.invoices = data.invoice
      this.customers = data.customer
      console.log(data);
    })
  }
  tanggal(str:string){
    const date = str.split(' ')
    return date[0]
  }
  ngOnInit(): void {
  }
  save(){
    this.isLoading = true
  }
  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data!).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.no_invoice+'.pdf');
    });
  }

}
