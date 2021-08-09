import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Checker } from 'src/app/models/checker';

@Component({
  selector: 'app-smu',
  templateUrl: './smu.component.html',
  styleUrls: ['./smu.component.scss']
})
export class SmuComponent implements OnInit {
  id:any
  data :any = []
  detail:any = {}
  checkedList: any = []
  notchecked=false
  project:any = {}
  checker: Array<Checker> = []
  constructor(
    private apiService:ApiService,
    private activateRoute:ActivatedRoute,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.id = activateRoute.snapshot.paramMap.get('id')
    setInterval(()=>{
      this.fetchData()
    },5000)
   }

  ngOnInit(): void {
    // $state.reload()
  }
  fetchData(){
    this.apiService.smu_list_checker(this.id).subscribe(async (data:any)=>{
      const datas = await data.map((val:any)=>{

          let objIndex = this.data.findIndex(((obj:any) => obj.id == val.id));
          // console.log(objIndex);
          if(objIndex===-1){
            this.data.push( {
              id : val.id,
              smu : val.smu,
              nama_barang : val.nama_barang,
              nama_agen : val.nama_agen,
              no_hp : val.no_hp,
              alamat : val.alamat,
              status : val.status,
              koli : val.koli,
              berat_awal : val.berat_awal,
              berat_recharge_cargo : val.berat_recharge_cargo,
              berat_total : val.berat_total,
              checker : val.checker,
              project_id : val.project_id,
              select : false
             })
          }

      })
      const data2 : any = await Promise.all(datas)
      console.log(this.data);
      // this.data = this.mergeDiffs(this.data, data2)

    })

    this.apiService.project_detail(this.id).subscribe((data:any)=>{

      this.project = data.data
    })
  }
  check(event: any, pos: any, id:any){
    if ( event.target.checked ) {
        this.checkedList.push(this.data[pos])
        let objIndex = this.data.findIndex(((obj:any) => obj.id == id));
        this.data[objIndex].select = true
        console.log(this.data);
      }else{
        this.checkedList = this.checkedList.filter(( obj: any ) => {
          return obj.id !== this.data[pos].id;
        });
        let objIndex = this.data.findIndex(((obj:any) => obj.id == id));
        this.data[objIndex].select = false
        console.log(this.data);
      }

  }

  save(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "data"   : encodeURIComponent(this.data),
      }
    };
    if(this.project.selesai!==3){
      return Swal.fire(
        'Btb belum selesai!',
        'Silahkan Tunggu sampai proses selesai!',
        'error'
      )
    }
    return this.router.navigate(['/checkers/document', this.id], { state: { data: JSON.stringify(this.checkedList)} });
    // console.log(this.checkedList);

  }
  mergeDiffs(Schedulearray1:any, Schedulearray2:any) {
      var secondArrayIDs = Schedulearray2.map((x:any)=> x.id);
      return Schedulearray1.filter((x:any)=> !secondArrayIDs.includes(x.id)).concat(Schedulearray2);
  }
  update(id: any, prop: string | number, val: any) {
    var person = this.data.find((p: any)=> {
      return p.id === id;
    });

    if (person && person[prop]) {
      person[prop] = val;
    }
  }
}
