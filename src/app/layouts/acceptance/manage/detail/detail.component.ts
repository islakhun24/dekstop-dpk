import { ApiService } from './../../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id:any
  form:FormGroup
  detail:any = {}
  constructor(
    private fb : FormBuilder,
    private apisService:ApiService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = fb.group({
      tanggal: ['', Validators.required],
      no: ['', Validators.required],
      no_polisi_kendaraan: ['', Validators.required],
      nama_pengemudi: ['', Validators.required],
      asal_tps: ['', Validators.required],
      kota_asal: ['', Validators.required],
      kota_tujuan: ['', Validators.required]
    })
   this.id = activatedRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.apisService.project_detail(this.id).subscribe(((data:any)=>{
      this.detail = data.data
        console.log(data);

    }))
  }

  change(e:any){
    this.form.patchValue({
      asal_tps: e.target.value
    })
  }

}
