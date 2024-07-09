import { Component,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ServerconnectionService } from '../../services/serverconnection.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterOutlet,  CommonModule, HeaderComponent]
})
export class HomeComponent {
  title = 'frontend';
  auth_service = inject(ServerconnectionService);
}

