import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  isActive: number = 0
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    if(url.includes('dashboard')){
      this.isActive = 0
    }
    if(url.includes('acceptance')){
      this.isActive = 1
    }
    if(url.includes('btb')){
      this.isActive = 2
    }
    if(url.includes('dokumen')){
      this.isActive = 3
    }
    if(url.includes('user')){
      this.isActive = 4
    }
    if(url.includes('harga')){
      this.isActive = 5
    }
    if(url.includes('customer')){
      this.isActive = 6
    }
  }
  click(num:number){
    this.isActive = num
    if(num==0){
      this.router.navigate(['/dashboard'])
    }
    if(num==1){
      this.router.navigate(['/acceptance'])
    }
    if(num==2){
      this.router.navigate(['/btb'])
    }
    if(num==3){
      this.router.navigate(['/dokumen'])
    }
    if(num==4){
      this.router.navigate(['/user'])
    }
    if(num==5){
      this.router.navigate(['/harga'])
    }
    if(num==6){
      this.router.navigate(['/customer'])
    }
  }
}
