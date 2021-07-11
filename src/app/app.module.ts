import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutsComponent } from './layouts/layouts.component';

import { authInterceptorProviders } from "./interceptors/auth.interceptor";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './layouts/user/user.module';
import { HargaModule } from './layouts/harga/harga.module';
import { DokumenModule } from './layouts/dokumen/dokumen.module';
import { CustomerModule } from './layouts/customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    HargaModule,
    DokumenModule,
    CustomerModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
