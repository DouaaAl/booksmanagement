import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { HeaderserviceService } from '../../services/headerservice.service';
import { ForgotpasswordComponent } from "../../auth/forgotpassword/forgotpassword.component";
import { LoginComponent } from "../../auth/login/login.component";
import { PopupComponent } from "../../auth/popup/popup.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [ForgotpasswordComponent, LoginComponent, PopupComponent, CommonModule]
})
export class HeaderComponent  {
  headerService = inject(HeaderserviceService);
  httpService = inject(ServerconnectionService);
  route = inject(Router);

  user: Object | null = {};
  openLogin(){
    this.headerService.openLogin = true;
  }
  openRegister(){
    this.headerService.openRegister = true;
  }
  openForgot(){
    this.headerService.openForgot = true;
  }

  logout(){
    this.httpService.logout().subscribe((res)=>{
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      this.httpService.getUser();
    })
    this.route.navigate(["/"]);
  }

  constructor(){
    this.httpService.getUser();
  }
}
