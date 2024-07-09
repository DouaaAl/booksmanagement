import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderserviceService implements OnInit {
  openLogin: boolean = false;
  openRegister: boolean = false;
  openForgot: boolean = false;
  route = inject(Router);


  constructor() { }
  
  ngOnInit() {
    if(typeof window !== 'undefined'){
      if (localStorage.getItem('user') == undefined) {
        this.route.navigate(["/"]);
      }
    }    
  }
}
