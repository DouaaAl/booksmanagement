import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupComponent } from "./auth/popup/popup.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from "./auth/login/login.component";
import { ForgotpasswordComponent } from "./auth/forgotpassword/forgotpassword.component";
import { HomeComponent } from './pages/home/home.component';

import {RouterModule} from '@angular/router'



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, PopupComponent, CommonModule, LoginComponent, ForgotpasswordComponent, HomeComponent, RouterModule]
})
export class AppComponent {

}
