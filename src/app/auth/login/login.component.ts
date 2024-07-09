import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { HeaderserviceService } from '../../services/headerservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  isProblem = false;
  isRestricted = false;
  errMessage = '';

  loginService = inject(ServerconnectionService);
  headerService = inject(HeaderserviceService);

  login(){
    this.isRestricted = false;
    this.loginService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe((res: any)=>{
      if(res.err){
        this.isProblem = true;
        this.errMessage = res.err;
      }
      else if (res?.status == 'restricted'){
        this.isRestricted = true;
      }
      else {
      localStorage.setItem("jwt", JSON.stringify({
        refreshToken: res?.refreshToken
      }))
      localStorage.setItem("user", JSON.stringify({
        email: res?.email,
        name: res?.name,
        role: res?.role,
        id: res?.id,
        status: res?.status
      }))
      this.headerService.openLogin = false;
      this.loginService.checkCurrentUser();
      this.loginService.getUser();
      this.isProblem = false;
    }
    })
  
  }

  closeLogin(){
    this.headerService.openLogin = false;
  }

}
