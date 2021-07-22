import { TokenStorageService } from './../services/token-storage.service';
import { HostListener , ElementRef} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  isActive: number = 0
  showmenu = false
  isOpen = true
  mobile = false
  logout: any = false
  notif: any = false
  out = false
  user:any = {}
  constructor(
    private eRef: ElementRef,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    router.events.subscribe((val:any) => this.out = false)
   }
   @HostListener('document:click', ['$event']) onDocumentClick($event:any) {
    this.logout = false;
    this.notif = false;
  }

    @HostListener("window:resize", [])
  onResize() {
    var width = window.innerWidth;
    this.mobile = width < 992;
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
    // console.log(this.user);
    if (window.screen.width < 992) {
      this.mobile = true;
    }
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
    if(url.includes('checkers')){
      this.isActive = 7
    }
    if(url.includes('admin-operasional')){
      this.isActive = 8
    }
    if(url.includes('team')){
      this.isActive = 9
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
      this.router.navigate(['/dokumen/index'])
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
    if(num==7){
      this.router.navigate(['/checkers'])
    }
    if(num==8){
      this.router.navigate(['/admin-operasional'])
    }
    if(num==9){
      this.router.navigate(['/team'])
    }
  }
  clickLogout(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.logout = !this.logout
    this.notif = false
  }
  clickTogle(){
    this.isOpen = !this.isOpen
    this.out = true
  }
  clickNotif(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.notif = !this.notif
    this.logout = false
  }

  logouts(){
    // alert('asda')

      this.router.navigate(['/login']).then(()=>{
        this.tokenStorage.signOut()
      })
  }
  // public onClick(target) {
  //   const clickedInside = this.elementRef.nativeElement.contains(target);
  //   if (!clickedInside) {
  //     // this click event from outside
  //   }
  // }

  // show(){
  //   this.showmenu = !this.showmenu
  // }


}
