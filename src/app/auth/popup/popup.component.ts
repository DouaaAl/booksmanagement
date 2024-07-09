import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { inject } from '@angular/core';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { HeaderserviceService } from '../../services/headerservice.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  applyForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[- +()0-9]+$')]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)])
  })
  userInfo = {}
  public serverFunctions = inject(ServerconnectionService)
  public headerService = inject(HeaderserviceService);

  closeBtnFunc(){
    this.headerService.openRegister = false;
  }
  isRegistered = false;
  isExist = false;
  errMessage = '';
  

  submitApplication() {
    if(!this.applyForm.controls['email'].invalid && !this.applyForm.controls['contact'].invalid && !this.applyForm.controls['password'].invalid){

      this.isRegistered = false;
      this.isExist = false;
      this.userInfo= {
        name: this.applyForm.value.fullName,
        email: this.applyForm.value.email,
        contactNumber: this.applyForm.value.contact,
        password: this.applyForm.value.password,
        role: "user",
        status: "allowed"
      }
      this.serverFunctions.register(this.userInfo).subscribe((res: any)=>{
        if(res?.errmessage){
          this.isExist = true;
          this.errMessage = res?.errmessage;
        }
        else {
          this.isRegistered = true;
        }
      })
      this.serverFunctions.getUsers();
      this.serverFunctions.getUser();
    }
  }
}
