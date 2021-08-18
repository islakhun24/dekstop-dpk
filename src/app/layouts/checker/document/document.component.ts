import Swal from 'sweetalert2';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  data: any;
  routeState: any;
  state: any;
  id: any;
  form: FormGroup;
  detail: any = {};
  data_smu: any = [];
  isi_kiriman: any;
  nama_agen: any;
  others: any = {};
  spx: boolean = false;
  sco: boolean = false;
  shr: boolean = false;
  xray: boolean = false;
  etd: boolean = false;
  edd: boolean = false;
  other: boolean = false;
  smu3: any = [];
  warehouses: any = [];
  sTujuan = '';

  onKey(e: any) {
    this.sTujuan = e.target.value;
  }
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = fb.group({
      isi_kiriman: [''],
      kota_asal: [''],
      kota_tujuan: [''],
      tanggal_penerbangan: [''],
      nama_pesawat: [''],
      nomor_polisi_kendaraan: [''],
      nama_pengemudi: [''],
      nama_agen: [''],
      pengecualian_pemeriksaan: [''],
      status_keamanan_diterbitkan_oleh: [''],
      metode_pemeriksaan_lain: [''],
      asal_transit: [''],
      tujuan_transit: [''],
      warehouse: [''],
      time_of_departure: [''],
    });
    this.id = activateRoute.snapshot.paramMap.get('id');
    apiService.document_checker(this.id).subscribe((data: any) => {
      console.log(data);
      this.warehouses = data.warehouses;
      this.data = data.smu;
      this.others = data.data;
      this.detail = data.detail;

      this.apiService.smu_by_project(this.id).subscribe((data) => {
        this.smu3 = data;
      });
      this.nama_agen = data.nama_agen.map((val: any) => {
        return val.nama_agen;
      });
      this.isi_kiriman = data.isi_kiriman.map((val: any) => {
        return val.nama_barang;
      });
    });
  }
  shows = false;
  toggleShow() {
    this.shows = !this.shows;
  }
  ngOnInit(): void {
    // console.log(this.activateRoute.snapshot.queryParams['data']);
  }
  isLoading: boolean = false;
  save() {
    this.isLoading = true;
    let formdata = this.form.value;
    formdata.qty = this.others.koli;
    formdata.total_berat = this.others.berat_total;
    formdata.smu = this.smu3;
    formdata.project_id = this.id;
    formdata.transit = this.transit;
    formdata.nama_agen = this.nama_agen;
    formdata.metode_pemeriksaan = this.metode_pemeriksaan;
    formdata.status_keamanan = this.status_keamanan;
    formdata.spx = this.spx;
    formdata.sco = this.sco;
    formdata.shr = this.shr;
    formdata.datawarehouse = this.datawarehouse;
    formdata.xray = this.xray;
    formdata.etd = this.etd;
    formdata.edd = this.edd;
    formdata.other = this.other;
    formdata.asal_tps = this.detail.asal_tps;
    this.apiService.csd_create(formdata).subscribe(
      (data) => {
        this.isLoading = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/checkers/list']);
        });
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  transit: any = '';
  metode_pemeriksaan: any = '';
  status_keamanan: any = '';
  isAda = false;
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
    this.other = e.target.checked;
  }
  datawarehouse: any = [];
  selectWarehhouse(e: any, warehouse: any) {
    const value = e.target.value;
    this.datawarehouse.push({
      warehouse: value,
      warehouseid: warehouse,
    });
  }
}
