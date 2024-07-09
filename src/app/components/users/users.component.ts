import { Component, inject } from '@angular/core';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReloadComponent } from "../reload/reload.component";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [CommonModule, ReactiveFormsModule, ReloadComponent]
})
export class UsersComponent {
  httpserver = inject(ServerconnectionService);
  users: any[] = []
  filterForm = new FormGroup({
    filter: new FormControl('')
  })
  isLoading: Boolean = false;
  isAllowed: Boolean = true;

  checkfilter(value: String){
    let filter = this.filterForm.value.filter;
    if(filter == ''){
      return true
    }
    else {
      if((filter && value.includes(filter))){
        return true;
      }

      return false
    }
  }
  getUsers(){
    this.isLoading = true;
    this.httpserver.getUsers().subscribe((res: any)=>{
      this.users = res;
      this.isLoading = false;
    })
  }

  deleteUser(id: Number){
    let user: any = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user).role;
    }
    if(user == "admin" ){
      console.log("user is admin");
      this.httpserver.deleteUser(id).subscribe((res: any)=>{
        this.getUsers();
        this.isAllowed = true;
      })
    }
    else {
      this.isAllowed = false
    }
  }

  updateUser(id: Number, state: String){
    this.httpserver.updateUser(id, state).subscribe((res)=>{
      this.getUsers()
    })
    
  }
  restrictUser(id: Number){
    this.httpserver.updateUser(id, 'restricted').subscribe((res)=>{
      this.getUsers()
    })
  }

  allowUser(id: Number){
    this.httpserver.updateUser(id, 'allowed').subscribe((res)=>{
      this.getUsers()
    })
  }
  

  checkUser(id: Number){
    let status: boolean = true;
    this.users.forEach((user)=>{
      if(user.id == id){
        if(user.status == "restricted"){
          status = false;
        }
      }
    })

    return status;
  }

  constructor(){
    this.getUsers();
  }
}
