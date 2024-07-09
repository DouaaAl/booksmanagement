import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { ReloadComponent } from "../reload/reload.component";

@Component({
    selector: 'app-books',
    standalone: true,
    templateUrl: './books.component.html',
    styleUrl: './books.component.css',
    imports: [ReactiveFormsModule, CommonModule, ReloadComponent]
})
export class BooksComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
    price: new FormControl(''),
    available: new FormControl('')
  });

  formAvailable = new FormGroup({
    newname: new FormControl(''),
    categoryId: new FormControl(''),
    newprice: new FormControl(''),
    available: new FormControl(''),
    description: new FormControl('')
  });

  categories: any[] = [];
  products: any[] = [];
  productsState: any[] = [];
  httpserver = inject(ServerconnectionService);
  isLoading: boolean = false;

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.httpserver.getProducts().subscribe((res: any) => {
      this.products = res;
      this.getProductsState();
      this.isLoading = false;
    });
  }

  addProduct(e: any) {
    e.preventDefault();
    const { name, categoryId, description, price, available: status } = this.productForm.value;

    if (name && categoryId && description && price && status) {
      this.httpserver.addProduct(name, parseInt(categoryId), description, parseInt(price), status)
        .subscribe(() => {
          this.getProducts();
        });
    }
  }

  getProductsState() {
    this.productsState = this.products.map(product => ({
      id: product.id,
      state: true
    }));
  }

  getState(id: Number) {
    const product = this.productsState.find(p => p.id === id);
    return product ? product.state : true;
  }

  changeInfo(id: Number) {
    this.productsState = this.productsState.map(product => {
      if (product.id === id) {
        product.state = false;
      }
      return product;
    });
  }

  deleteProduct(id: Number) {
    this.httpserver.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }

  trueState(id: Number, name: string, categoryId: Number, price: Number, status: String, description: String) {
    if (id) {
      this.productsState = this.productsState.map(product => {
        if (product.id === id) {
          product.state = true;
        }
        return product;
      });
    }
    this.changeProductInfo(name, categoryId, price, status, id, description);
  }

  changeProductInfo(name: string, categoryId: Number, price: Number, status: String, id: Number, description: String) {
    let newname = name;
    let newcategory = categoryId;
    let newprice = price;
    let newstatus = status;
    let newdescription = description;

    if (this.formAvailable.value.newname) {
      newname = this.formAvailable.value.newname;
    }
    if (this.formAvailable.value.categoryId) {
      newcategory = parseInt(this.formAvailable.value.categoryId);
    }
    if (this.formAvailable.value.newprice) {
      newprice = parseInt(this.formAvailable.value.newprice);
    }
    if (this.formAvailable.value.available) {
      newstatus = this.formAvailable.value.available;
    }
    if (this.formAvailable.value.description) {
      newdescription = this.formAvailable.value.description;
    }

    this.httpserver.updateProduct(newname, newprice, id, newstatus, newcategory, newdescription).subscribe(() => {
      this.getProducts();
    });
  }

  getCategories() {
    this.httpserver.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }
}