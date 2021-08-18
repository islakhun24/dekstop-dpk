import { environment } from 'src/environments/environment.prod';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';

declare var require: any;
const FileSaver = require('file-saver');
const url = environment.base_url;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  data: any = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.csd_past_check_list().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
  isDownload = false;
  downloadPdf(id: any, no: any) {
    this.isDownload = true;
    this.downloadPdfs(id, no).then((data) => {
      this.isDownload = false;
    });
  }
  downloadPdfs(id: any, no: any) {
    return new Promise((resolve) => {
      const pdfUrl = url + 'exp/csd/' + id;
      const pdfName = no + '.xlsx';
      FileSaver.saveAs(pdfUrl, pdfName);
      resolve(true);
    });
  }
}
