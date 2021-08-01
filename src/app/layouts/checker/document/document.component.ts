import  Swal  from 'sweetalert2';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  data:any
  routeState: any;
  state : any
  id: any
  form:FormGroup
  detail:any = {}
  qty: any
  total_berat : any = {}
   uniq:any = {}
   barangUniq:any = {}
   agenUniq:any={}
   data_smu : any = []
  isi_kiriman : any
  nama_agen:any
  constructor(
    private activateRoute:ActivatedRoute,
    private router: Router,
    private location:Location,
    private fb: FormBuilder,
    private apiService:ApiService
  ) {

    this.form = fb.group({
      isi_kiriman:[''],
      kota_asal:[''],
      kota_tujuan:[''],
      tanggal_penerbangan:[''],
      nama_pesawat:[''],
      nomor_polisi_kendaraan:[''],
      nama_pengemudi:[''],
      nama_agen:[''],
      pengecualian_pemeriksaan:[''],
      status_keamanan_diterbitkan_oleh:['']
    })
    this.id = activateRoute.snapshot.paramMap.get('id')
    this.state = this.router?.getCurrentNavigation()?.extras.state?.data;
    // console.log(this.state);

    if(!this.state){
       router.navigate(['checkers/smu',this.id])

    }else{



      this.data_smu = JSON.parse(this.router?.getCurrentNavigation()?.extras.state?.data)
      this.qty= this.data_smu.length
      this.total_berat = this.data_smu.map((o:any) => o.berat_total).reduce((a:any, c:any) => { return a + c });
      this.data = this.data_smu.filter((obj:any) => !this.uniq[obj.smu] && (this.uniq[obj.smu] = true));
      let newData = this.data_smu.filter((obj:any) => !this.barangUniq[obj.nama_barang] && (this.barangUniq[obj.nama_barang] = true));
      let dataAgen = this.data_smu.filter((obj:any) => !this.agenUniq[obj.nama_agen] && (this.agenUniq[obj.nama_agen] = true));
      let str = ''
      this.isi_kiriman = newData.map((val: any)=>{

        return  val.nama_barang
      })
      this.nama_agen = dataAgen.map((val: any)=>{

        return  val.nama_agen
      })
      apiService.project_detail(this.id).subscribe((data:any)=>{

        this.detail = data.data

      })
    }



  }

  ngOnInit(): void {
    // console.log(this.activateRoute.snapshot.queryParams['data']);

  }
  isLoading : boolean = false
  save(){
    this.isLoading = true
    let formdata = this.form.value
    formdata.qty = this.qty
    formdata.total_berat = this.total_berat
    formdata.smu = this.data_smu
    formdata.project_id = this.id
    formdata.transit = this.transit
    formdata.nama_agen = this.nama_agen
    formdata.metode_pemeriksaan = this.metode_pemeriksaan
    formdata.status_keamanan = this.status_keamanan
    formdata.asal_tps = this.asal_tps(this.detail.asal_tps)
    this.apiService.csd_create(formdata).subscribe(data=>{

    this.isLoading = false
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['/checkers/list'])
      })
    },err=>{
      this.isLoading = false
      console.log(err);

    })

  }

  asal_tps(str : any){
    let tps = ""

    if(str === 'PT. Inti Barokah Utama'){
      tps = 'IBU'
    }else if(str === 'PT. Persero Batam'){
          tps = 'PBT'
    }else if(str === 'PT. Angkasa Pura Logistic'){
      tps = 'APL'
    }else if(str === 'PT. Pukadara'){
      tps = 'PKD'
    }else if(str === 'PT. Pos Indonesia'){
      tps = 'PID'
    }else if(str === 'PT. J&T express'){
      tps = 'JNT'
    }else if(str === 'PT. Satnusa Persada TBK'){
      tps = 'SPT'
    }else if(str === 'PT. Dharma Bandar Mandala'){
      tps = 'DBM'
    }else if(str === 'PT. AIE'){
      tps = 'AIE'
    }
    return tps
  }
  transit: any = ''
  metode_pemeriksaan: any = ''
  status_keamanan: any = ''

  changeTransit(e:any){
    this.transit = e.target.value
  }
  changeKeamanan(e:any){
    this.status_keamanan = e.target.value
  }
  changePemerikasaan(e:any){
    this.metode_pemeriksaan = e.target.value
  }
}
