import { ApiService } from './../../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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
  isLoading : boolean = false
  save(){
    const formdata = this.form.value
    // console.log(formdata);

    this.isLoading = true
    this.apisService.project_edit(formdata,this.id).subscribe((success:any)=>{
      this.router.navigate(['/acceptance/list'])
    },(err:any)=>{
      console.log(err);

    })

  }

  change(e:any){
    this.form.patchValue({
      asal_tps: e.target.value
    })
  }
}
