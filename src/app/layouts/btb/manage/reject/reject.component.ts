import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from './../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


import { webSocket } from "rxjs/webSocket";
const subject = webSocket("ws://localhost:8081");
@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.scss'],
})
export class RejectComponent implements OnInit {
  id: any;
  data: any = [];
  detail: any = {};
  form: FormGroup;
  berat_awal: any;
  isList = true;
  berat_total: any;
  errs = false;
  disable = true;
  ischecker = false;
  constructor(
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({
      berat: [''],
    });
  }
  disabled() {
    this.apiService.check_approval(this.id).subscribe((data: any) => {
      console.log(data);
      if (data.success === true) {
        this.disable = false;
      }
      if (data.success === false) {
        this.disable = true;
      }
    });
  }
  fetchData() {
    this.apiService.btb_reject(this.id).subscribe((data: any) => {
      this.data = data;
    });
  }
  berat:any
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.apiService.btb_reject(this.id).subscribe(
      (data: any) => {
        this.isList = false;
        this.data = data;

        this.detail = data[0];
        this.berat_awal = this.detail.berat_awal;
        this.berat_total = this.detail.berat_total;
      },
      (err) => {
        this.isList = false;
      }
    );
    setInterval(() => {
      this.fetchData();
      this.disabled();
      // this.isList = false;
    }, 3000);
    subject.subscribe(
      (msg:any) => {
       this.berat = msg
        

      }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }
  keyup(e: any) {
    let num = e.target?.value;
    if (num > this.detail.berat_total) {
      this.form.controls['berat'].setValue(this.detail.berat_total);
      this.berat_total = this.berat_awal - this.form.value.berat;
    } else {
      this.errs = false;
      this.berat_total = this.berat_awal - num;
    }
  }
  click(i: any) {
    if (i !== 0) {
      this.detail = this.data[i];
    }
  }
  change() {
    this.ischecker = !this.ischecker;
  }

  save() {
    let checker = 3;

    let fomdata = this.form.value;
    fomdata.berat_awal = this.detail.berat_awal;
    fomdata.berat_recharge_cargo = fomdata.berat;
    fomdata.berat_total = this.detail.berat_awal - fomdata.berat;
    fomdata.checker = checker;
    fomdata.id = this.detail.id;
    fomdata.project_id = this.id;
    if (
      fomdata.berat_recharge_cargo == 0 ||
      fomdata.berat_recharge_cargo == ''
    ) {
      fomdata.berat_recharge_cargo = 0;

      return Swal.fire(
        'Data tidak boleh 0!',
        'Silahkan Periksa kembali!',
        'error'
      );
    }
    if (this.berat_total < 0) {
      return Swal.fire(
        'Data tidak boleh kurang dari 0!',
        'Silahkan Periksa kembali!',
        'error'
      );
    } else {
      return this.apiService.smu_checker(fomdata).subscribe((data: any) => {
        this.form.reset();
        this.apiService.btb_reject(this.id).subscribe((data: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Data disimpan',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            if (data.length > 0) {
              this.data = data;
              this.detail = data[0];
              this.berat_awal = this.detail.berat_awal;
              this.berat_total = this.detail.berat_total;
            } else {
              this.data = [];
              this.detail = {};
            }
          });
        });
      });
    }
  }
  selesai() {
    this.router.navigate(['/btb/manage/checker', this.id]);
  }
  kirim_approval() {
    Swal.fire({
      title: 'Kirim Aproval?',
      text: 'Apakah ingin kirim approval!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Selesai',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.apiService.kirim_approval(this.id).subscribe(
          (data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Berhasil',
              showConfirmButton: false,
              timer: 1500,
            }).then((data) => {
              this.router.navigate(['/btb/manage/checker', this.id]);
            });
          },
          (err) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Gagal',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
    // this.apiService.kirim_approval(this.id).subscribe(data=>{})
  }
}
