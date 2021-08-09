import { ApiService } from './../../../services/api.service';
import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner! : BarcodeScannerLivestreamComponent ;
  suggestsmu:any = []
  agens:any = []
  barangs:any = []
  customer :any= {}
  isLoading  = false;
  showModal = false;
  barcodeValue = '';
  id: any ;
  smu: any = [];
  detail: any = {};
  form: FormGroup;
  no_smu= ''
  data : any= [];
  constructor(
    private apiService: ApiService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router:Router
  ){
    this.id = activatedRouter.snapshot.paramMap.get('id');

    this.form = fb.group({
      smu: [''],
      nama_agen: [''],
      no_hp: [''],
      alamat: [''],
      nama_barang: [''],
      berat_awal: [''],
      berat_recharge_cargo: [''],
      project_id: ['']
    });
    setInterval(()=>{
      this.fetchData()
    },3000)
  }

  fetchData(){
    this.apiService.project_detail(this.id).subscribe(((data: any)=>{
      this.detail = data.data;

    }));

    this.apiService.smu_list2(this.id).subscribe((data: any)=>{
      this.data = data;

    });
  }
  ngAfterViewInit() {
    this.barcodeScanner.start();

  }

  onValueChanges(result: any) {
    this.no_smu = result.codeResult.code;
    this.showModal = true
  }

  onStarted(started: any) {

  }
  toggleModal(){
    this.showModal = !this.showModal;
  }

  save(){
    let formdata = this.form.value;
    formdata.project_id = this.id;
    this.isLoading = true;
    this.apiService.smu_create2(formdata).subscribe((data: any)=>{
      this.isLoading = false;
      this.data = data;
      this.showModal = !this.showModal;
    });
  }
  back(){

  }
  onSmu(event: any){
    let str = event.target.value
    if(str.length>0){
      this.apiService.suggest_smu({no_smu:str}).subscribe(data=>{
       this.suggestsmu = data

      })
    }


  }
  smuSelect(str:any){
    this.no_smu = str
    this.suggestsmu = []
  }
  onCustomer(event: any){
    let str = event.target.value
    if(str.length>0){
      this.apiService.suggest_customer({customer:str}).subscribe(data=>{
       this.agens = data

      })
    }


  }
  customerSelect(data:any){
    this.customer = data
    this.agens = []
  }
  onBarang(event: any){
    let str = event.target.value
    if(str.length>0){
      this.apiService.suggest_barang({nama_barang:str, kode_barang:str}).subscribe(data=>{
       this.barangs = data

      })
    }


  }
  barang:any = {}
  barangSelect(data:any){
    this.barang = data
    this.barangs = []
  }

  selesai(){
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Projek ini telah selesai !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      confirmButtonAriaLabel: 'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.acceptance_selesai(this.id).subscribe(data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Projek seleseai di acceptance',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.router.navigate(['/acceptance/list'])
          })
        },err=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    })
  }
}
