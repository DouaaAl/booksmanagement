import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { DetailsComponent } from '../../components/details/details.component'
import { CategoriesComponent } from "../../components/categories/categories.component";
import { CommonModule } from '@angular/common';
import { BooksComponent } from "../../components/books/books.component";
import { OrdersComponent } from "../../components/orders/orders.component";
import { UsersComponent } from "../../components/users/users.component";
import { ServerconnectionService } from '../../services/serverconnection.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [HeaderComponent, DetailsComponent, CategoriesComponent, CommonModule, BooksComponent, OrdersComponent, UsersComponent]
})
export class DashboardComponent implements OnInit {
    currentComponent: any = DetailsComponent; // Set default component

    // Get server
    route = inject(Router);
    httpserver = inject(ServerconnectionService);

    // Define the component map
    componentMap = {
      details: DetailsComponent,
      categories: CategoriesComponent,
      products: BooksComponent,
      bills: OrdersComponent,
      users: UsersComponent
    };

    goDetails() {
      this.currentComponent = this.componentMap.details;
    }

    goCategories() {
      this.currentComponent = this.componentMap.categories;
    }

    goProducts() {
      this.currentComponent = this.componentMap.products;
    }

    goBills() {
      this.currentComponent = this.componentMap.bills;
    }

    goUsers() {
      this.currentComponent = this.componentMap.users;
    }

    constructor() {}

    ngOnInit() {
      if(typeof window !== 'undefined'){
        if (localStorage.getItem('user') == undefined) {
          this.route.navigate(["/"]);
        }
      }

    }
}