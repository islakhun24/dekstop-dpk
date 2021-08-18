import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { timeStamp, table } from 'console';

declare var require: any;
const FileSaver = require('file-saver');
const url = environment.base_url;
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  isLoading = false;
  no_csd: string = 'DPK-202107090001';
  print = false;
  form: FormGroup;
  project: any = {};
  shows = false;
  id: any;
  detail: any = {};
  transit: any = '';
  tgls: string = '';
  metode_pemeriksaan: any = '';
  status_keamanan: any = '';
  isList: boolean = true;
  smu: any = [];
  smu2: any = [];
  spx: boolean = false;
  sco: boolean = false;
  shr: boolean = false;
  xray: boolean = false;
  etd: boolean = false;
  edd: boolean = false;
  other: boolean = false;
  ya: boolean = false;
  tidak: boolean = false;
  isAda = false;
  warehouses: any = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {
    this.form = this.fb.group({
      // project_id:[''],
      isi_kiriman: [''],
      nama_agen: [''],
      qty: [''],
      berat_total: [''],
      asal_tps: [''],
      kota_asal: [''],
      kota_tujuan: [''],
      tanggal_penerbangan: [''],
      nama_pesawat: [''],
      nomor_polisi_kendaraan: [''],
      nama_pengemudi: [''],
      pengecualian_pemeriksaan: [''],
      status_keamanan_diterbitkan_oleh: [''],
      status_keamanan: [''],
      metode_pemeriksaan_lain: [''],
      metode_pemeriksaan: [''],
      transit: [''],
      no_segel_keamanan_kendaraan: [''],
      no_kunci_plastik_solid: [''],
      nama_pengemudi_csd: [''],
      warehouse_destination: [''],
      cosignor_name: [''],
      time_of_departure: [''],
      company_name: [''],
      vehicle_number: [''],
      truck_security_steal: [''],
      truck_security_label: [''],
      driver_name: [''],
    });
  }
  smu3: any = [];
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.apiService.csd_detailt(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.project = data.project;
        this.detail = data.detail;
        this.warehouses = data.warehouse;
        this.spx = this.detail.spx;
        this.sco = this.detail.sco;
        this.shr = this.detail.shr;
        this.xray = this.detail.xray;
        this.etd = this.detail.etd;
        this.edd = this.detail.edd;
        this.other = this.detail.other;
        this.ya = this.detail.ya;
        this.tidak = this.detail.tidak;
        if (this.detail.transit === 'ADA') {
          this.isAda = true;
        }
        if (this.detail.other === true) {
          this.formAdd = true;
        }
        this.apiService
          .smu_by_project(this.detail.project_id)
          .subscribe((data) => {
            this.smu3 = data;
          });
        // this.apiService.p
        this.detail.status_keamanan = this.detail.status_keamanan;
        this.metode_pemeriksaan = this.detail.metode_pemeriksaan;
        this.transit = this.detail.transit;
        this.detail.tanggal_penerbangan = this.tanggal(
          this.detail.tanggal_penerbangan
        );
        this.apiService.csd_smu(this.id).subscribe(
          (data) => {
            this.smu = data;

            this.isList = false;
          },
          (err) => {
            this.isList = false;
          }
        );
      },
      (err) => {
        this.isList = false;
      }
    );
  }
  save(action: any) {
    this.isLoading = true;
    let formdata = this.form.value;
    formdata.transit = this.transit;
    formdata.metode_pemeriksaan = this.metode_pemeriksaan;
    formdata.status_keamanan = this.status_keamanan;
    formdata.spx = this.spx;
    formdata.sco = this.sco;
    formdata.shr = this.shr;
    formdata.xray = this.xray;
    formdata.etd = this.etd;
    formdata.edd = this.edd;
    formdata.other = this.other;
    formdata.asal_tps = this.detail.asal_tps;

    this.apiService.csd_update(this.id, formdata).subscribe(
      (data) => {
        // this.print = true
        this.apiService.csd_detailt(this.id).subscribe(
          (data) => {
            this.detail = data;
            this.detail.status_keamanan = this.detail.status_keamanan;
            this.metode_pemeriksaan = this.detail.metode_pemeriksaan;
            this.transit = this.detail.transit;
            this.detail.tanggal_penerbangan = this.tanggal(
              this.detail.tanggal_penerbangan
            );
            // this.form.get('tanggal_penerbangan')?.setValue(this.detail.tanggal_penerbangan)
            this.apiService.csd_smu(this.id).subscribe(
              (data) => {
                // console.log(data);
                this.smu = data;
                this.apiService
                  .csd_smu2(this.id, this.detail.project_id)
                  .subscribe((data: any) => {
                    this.isLoading = false;
                    this.smu2 = data;

                    // this.generatePDF(action);
                    this.route.navigate(['/dokumen/csd']);
                  });
                this.isList = false;
              },
              (err) => {
                this.isLoading = false;
                this.isList = false;
              }
            );
          },
          (err) => {
            this.isLoading = false;
            this.isList = false;
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  tanggal(str: string) {
    const string1 = str.split(' ');
    const date = string1[0];
    const date1 = date.split('-');

    return date1[0] + '-' + date1[1] + '-' + date1[2];
  }

  changeTransit(e: any) {
    this.transit = e.target.value;
    if (e.target.value === 'Ada') {
      this.isAda = true;
    } else {
      this.isAda = false;
    }
  }
  changeKeamanan(e: any) {
    this.status_keamanan = e.target.value;
  }
  changePemerikasaan(e: any) {
    this.metode_pemeriksaan = e.target.value;
  }

  tgl() {
    let todayDate = new Date().toISOString().slice(0, 10);
    const date1 = todayDate.split('-');

    return date1[0] + date1[1] + date1[2];
  }

  toggleShow() {
    this.shows = !this.shows;
  }

  tgll(tgl: string) {
    const date = tgl.split('/');
    return date[2] + '-' + date[1] + '-' + date[0];
  }

  onchangeshr(e: any) {
    this.shr = e.target.checked;
  }
  onchangesco(e: any) {
    this.sco = e.target.checked;
  }
  onchangeetd(e: any) {
    this.etd = e.target.checked;
  }
  onchangespx(e: any) {
    this.spx = e.target.checked;
  }
  onchangexray(e: any) {
    this.xray = e.target.checked;
  }
  onchangeedd(e: any) {
    this.edd = e.target.checked;
  }
  formAdd = false;
  onchangeother(e: any) {
    if (e.target.checked === true) {
      this.formAdd = true;
    } else {
      this.formAdd = false;
    }
    this.edd = e.target.checked;
  }

  download() {
    this.isLoading = true;
    let formdata = this.form.value;
    formdata.transit = this.transit;
    formdata.metode_pemeriksaan = this.metode_pemeriksaan;
    formdata.status_keamanan = this.status_keamanan;
    formdata.spx = this.spx;
    formdata.sco = this.sco;
    formdata.shr = this.shr;
    formdata.xray = this.xray;
    formdata.etd = this.etd;
    formdata.edd = this.edd;
    formdata.other = this.other;
    formdata.asal_tps = this.detail.asal_tps;

    this.apiService.csd_update(this.id, formdata).subscribe((data) => {
      this.downloadPdf().then((result) => {
        this.isLoading = false;
      });
    });
  }
  downloadPdf() {
    return new Promise((resolve) => {
      const pdfUrl = url + 'exp/csd/' + this.id;
      const pdfName = this.project.no + '.xlsx';
      FileSaver.saveAs(pdfUrl, pdfName);
      resolve(true);
    });
  }
}
