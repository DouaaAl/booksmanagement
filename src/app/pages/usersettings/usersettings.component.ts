import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule]
})
export class UsersettingsComponent implements OnInit {
  isChangeEmail: boolean = false;
  isChangeName: boolean = false;
  isChangePassword: boolean = false;
  isDeleteAccount: boolean = false;
  passMissMatchMessage: String = "Passwords don't match";

  route = inject(Router);
  user: any = {
    email: "default email",
    id: ""
  }

  confirmed: boolean = false;

  // forms
  isEmailMismatch: boolean = false;
  isNameMismatch: boolean = false;
  isPasswordMismatch: boolean = false;
  emailForm = new FormGroup({
    email: new FormControl(""),
    confirmedEmail: new FormControl("")
  })

  nameForm = new FormGroup({
    name: new FormControl(""),
    confirmedName: new FormControl("")
  })

  passwordForm = new FormGroup({
    newpassword: new FormControl(""),
    confirmedNewpassword: new FormControl("")
  })

  deleteForm = new FormGroup({
    accept: new FormControl(""),
  })

  httpserver = inject(ServerconnectionService);

  // Toggle On Click
  ToggleEmail(){
    this.isChangeEmail = !this.isChangeEmail;
  }
  ToggleName(){
    this.isChangeName = !this.isChangeName;
  }
  TogglePassword(){
    this.isChangePassword = !this.isChangePassword;
  }
  ToggleDelete(){
    this.isDeleteAccount = !this.isDeleteAccount;
  }

  // handle submission
  confirmPassword(){
    this.httpserver.checkCurrentUser();
    this.httpserver.checkToken();
  }
  handleEmail(e: Event){
    e.preventDefault();
    this.confirmPassword();
    let email = this.emailForm.value.email;
    let confirmedEmail = this.emailForm.value.confirmedEmail;
    if(email != confirmedEmail){
        this.isEmailMismatch = true;
        return
    }
    else {
      if(email){
        this.httpserver.changeEmail(this.user.id, email).subscribe((res)=>{
          localStorage.setItem("user", JSON.stringify({
            email: email,
            name: this.user.name,
            role: this.user.role,
            id: this.user.id,
            status: this.user.status
          }))
          this.updateUser();
          this.isEmailMismatch = false;
        })
      }
    }
  }

  handleName(e: Event){
    this.updateUser();
    e.preventDefault();
    this.confirmPassword();
    let name = this.nameForm.value.name;
    let confirmedName = this.nameForm.value.confirmedName;
    if(name != confirmedName){
        this.isNameMismatch = true;
        return
    }
    else {
      if(name){
        this.httpserver.changeName(this.user.id, name).subscribe((res)=>{
          localStorage.setItem("user", JSON.stringify({
            email: this.user.email,
            name: name,
            role: this.user.role,
            id: this.user.id,
            status: this.user.status
          }))
          this.updateUser();
          this.isNameMismatch = false;
        })
      }
    }
  }

  handlePassword(e: Event){
    e.preventDefault();
    this.confirmPassword();
    let password = this.passwordForm.value.newpassword;
    let confirmedPassword = this.passwordForm.value.confirmedNewpassword;
    if(password != confirmedPassword){
        this.isPasswordMismatch = true;
        return
    }
    else {
      if(password){
        this.httpserver.changePassword(this.user.id, password).subscribe((res)=>{
          this.updateUser();
          this.isPasswordMismatch = false;
          this.httpserver.getUsers().subscribe((res)=>{
            console.log("current users ", res);
          })
        })
      }
    }
  }


  updateUser(){
    this.user = this.httpserver.getUser();
    console.log(this.user);
    this.user = JSON.parse(this.user);
    console.log("parsed this user", this.user);
  }

  constructor(){
    this.updateUser();
  }

  ngOnInit() {
    if(typeof window !== 'undefined'){
      if (localStorage.getItem('user') == undefined) {
        this.route.navigate(["/"]);
      }
    }    
    this.updateUser();
  }
  
}