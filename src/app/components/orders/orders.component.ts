import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxExtendedPdfViewerModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdersComponent {
  customerDetails = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    paymentMethod: new FormControl('')
  })
  productDetails = new FormGroup({
    categoryId: new FormControl(''),
    product: new FormControl(''),
    quantity: new FormControl('')
  })

  bills: any[] = []


  httpServer = inject(ServerconnectionService);
  customer: any = {
    name: '',
    email: '',
    contact: 0,
    paymentMethod: ''
  }
  categories: any[]=[]
  productCategories: any[]=[]
  products: any[] = []
  route = inject(Router);
  isLoading: Boolean = false;


  getCustomer(){
    let name = this.customerDetails.value.name || 'undefined';
    let email = this.customerDetails.value.email || 'undefined';
    let contact = 0;
    if(this.customerDetails.value.contact){
      contact = parseInt(this.customerDetails.value.contact) || 0;
    }
    let paymentMethod = this.customerDetails.value.paymentMethod || 'undefined';
    this.customer = {
      name: name,
      email,
      contact,
      paymentMethod
    }
  }

  addProduct(){
    let price = 0;
    this.productCategories.forEach((item)=>{
      if(item.id == this.productDetails.value.product){
        price = parseInt(item.price);
      }
    })
    let newProduct = {
      categoryId: this.productDetails.value.categoryId,
      product: this.productDetails.value.product,
      quantity: this.productDetails.value.quantity,
      price
    }
    this.products.push(newProduct);
  }

  getCategories(){
    this.httpServer.getCategories().subscribe((res: any)=>{
      this.categories = res;
    })
  }
  getProductsById(){
    let id = 1;
    if(this.productDetails.value.categoryId){
       id = parseInt(this.productDetails.value.categoryId);
    }
    if(this.httpServer.getProductByCategory(id)){
      let result = this.httpServer.getProductByCategory(id)
      result.subscribe((res: any)=>{
        this.productCategories = res;
      })
    }
  }

  getProductTotal(){
    let total = 0;
    this.products.forEach((product)=>{
      console.log("calculating total", product);
      total = total + product.price * parseInt(product.quantity);
    })
    return total;
  }

  getUser(){
    return this.httpServer.checkCurrentUser();
  }

  async addBill(){
    this.isLoading = true;
    this.getCustomer();
    let name = this.customer.name;
    let email = this.customer.email;
    let contact = this.customer.contact;
    let paymentMethod = this.customer.paymentMethod;
    let productDetails = this.products;
    let total = this.getProductTotal();
    let user: any = localStorage.getItem('user');

    let billInfo = {
      name,
      email,
      contactNumber: contact,
      paymentMethod,
      total: total,
      productDetails: JSON.stringify(productDetails), 
      createdBy: JSON.parse(user).name
    }

    this.httpServer.viewBill(billInfo).subscribe((res:any)=>{
      if(res.message){
        this.getBills();
      }
    })
}

  getBills(){
    this.isLoading = true;
    this.httpServer.getBills().subscribe((res: any)=>{
      this.bills = res;
      this.isLoading = false;
    })
  }

  deleteBill(id: Number){
    this.httpServer.deleteBill(id).subscribe((res)=>{
        this.getBills();
      })      

  }

  routeToBill(uuid: String){
    this.route.navigate(["/bill/"+uuid]);
  }



  constructor(){
    this.getBills();
    this.getCustomer();
    this.getCategories();
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }
}
