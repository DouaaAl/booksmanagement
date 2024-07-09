import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Output, OnInit, EventEmitter } from '@angular/core';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { HeaderserviceService } from '../../services/headerservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl("")
  })
  isSent: Boolean = false;
  isExist: Boolean = false;
  errMessage: String = '';

  authService = inject(ServerconnectionService);
  headerService = inject(HeaderserviceService);

  forgot(){
    this.isSent = false;
    this.authService.forgotPassword({
      email: this.forgotForm.value.email
    }).subscribe((res: any)=>{
      if(res.err){
        this.isExist = true;
        this.errMessage = res.err;
      }
      else{
        this.isSent = true;
      }
    })
  }

  closeForgot(){
    this.headerService.openForgot = false;
  }


  
}
