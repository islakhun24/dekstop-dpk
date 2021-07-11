import { AuthService } from './../../services/auth.service';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShowing: boolean = false
  form: FormGroup
  constructor(
    private router: Router,
    private fb:FormBuilder,
    private tokenStorage:TokenStorageService,
    private authService:AuthService
  ){
    this.form = fb.group({
        username:[''],
        password:['']
    })
  }
  ngOnInit(): void {
  }
  showPassword(){
    this.isShowing = !this.isShowing;
  }
  isMessage:boolean = false
  isLoading:boolean = false
  message:string = ""
  login(){
    this.isLoading = true
    this.isMessage = false
    const user = this.form.value
    this.authService.signin(user).subscribe(
      (data:any)=>{

        this.isLoading = false
        console.log(data);

        this.tokenStorage.saveToken(data.accessToken);
         this.tokenStorage.saveUser(data.users);

        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      },
      (error:any)=>{
        this.message = error.error.message
        this.isMessage = true
        this.isLoading = false
      }
    )
  }
}
