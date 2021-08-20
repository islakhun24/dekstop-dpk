import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Checker } from 'src/app/models/checker';

@Component({
  selector: 'app-smu',
  templateUrl: './smu.component.html',
  styleUrls: ['./smu.component.scss'],
})
export class SmuComponent implements OnInit {
  id: any;
  data: any = [];
  detail: any = {};
  checkedList: any = [];
  notchecked = false;
  project: any = {};
  checker: Array<Checker> = [];
  constructor(
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.id = activateRoute.snapshot.paramMap.get('id');
    this.apiService.smu_list_checker(this.id).subscribe(async (data: any) => {
      this.data = data.data;
    });
    setInterval(() => {
      this.fetchData();
    }, 1000);
  }

  ngOnInit(): void {
    // $state.reload()
  }
  fetchData() {
    this.apiService.smu_list_checker(this.id).subscribe(async (data: any) => {
      console.log(data);
      if (data.success === 1) {
        this.data = data.data;
      }
    });

    this.apiService.project_detail(this.id).subscribe((data: any) => {
      this.project = data.data;
    });
  }
  check(event: any, pos: any, id: any) {
    const check: boolean = event.target.checked;
    this.apiService
      .updatechecker(id, { check: check })
      .subscribe((data: any) => {
        // this.data = data;
      });
  }

  save() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: encodeURIComponent(this.data),
      },
    };
    if (this.project.selesai !== 3) {
      return Swal.fire(
        'Btb belum selesai!',
        'Silahkan Tunggu sampai proses selesai!',
        'error'
      );
    }
    return this.router.navigate(['/checkers/document', this.id], {
      state: { data: JSON.stringify(this.checkedList) },
    });
    // console.log(this.checkedList);
  }
  mergeDiffs(Schedulearray1: any, Schedulearray2: any) {
    var secondArrayIDs = Schedulearray2.map((x: any) => x.id);
    return Schedulearray1.filter(
      (x: any) => !secondArrayIDs.includes(x.id)
    ).concat(Schedulearray2);
  }
  update(id: any, prop: string | number, val: any) {
    var person = this.data.find((p: any) => {
      return p.id === id;
    });

    if (person && person[prop]) {
      person[prop] = val;
    }
  }
}
