import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ServerconnectionService } from '../../services/serverconnection.service';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  filterForm = new FormGroup({
    search: new FormControl('')
  });
  formName = new FormGroup({
    newname: new FormControl('')
  });
  id: Number = 0;
  categoriesServer = inject(ServerconnectionService);
  categories: any[] = []; 
  categoriesState: any[] = [];

  ngOnInit() {
    this.getCategories();
  }

  checkFilter(value: any){
    let filter = this.filterForm.value.search;
    if(filter == ''){
      return true
    }
    else {
      if((value.includes(filter)) && filter){
        return true;
      }

      return false
    }
  }
  getCategoriesState() {
    let i = 0;
    this.categoriesState = []; 
    this.categories.forEach(category => {
      this.categoriesState.push({
        id: category.id,
        state: true,
        order: i
      });
      i++;
    });
  }

  getCategories() {
    this.categoriesServer.getCategories().subscribe((res: any) => {
      this.categories = res;
      this.getCategoriesState(); 
    });
  }

  addCategory(e: any) {
    e.preventDefault();
    let newCategory = this.filterForm.value.search;
    if (newCategory) {
      this.categoriesServer.addCategory(newCategory).subscribe((res) => {
        this.getCategories();
      });
    }
  }

  deleteCategory(name: String) {
    this.categoriesServer.deleteCategory(name).subscribe((res) => {
      this.getCategories();
    });
  }

  getState(id: Number) {
    let state = true;
    this.categoriesState.forEach((category) => {
      if (id == category.id) {
        if (category.state == false) {
          state = false;
        }
      }
    });
    return state;
  }

  changeName(id: any) {
    console.log("Changing name for category ID:", id);
    this.categoriesState = this.categoriesState?.map((category) => {
      if (category?.id === id) {
        return { ...category, state: false };
      }
      return category;
    });
  }

  trueState(id: Number) {
    this.categoriesState = this.categoriesState?.map((category) => {
      if (category?.id === id) {
        return { ...category, state: true };
      }
      return category;
    });
    let newname = this.formName.value.newname;
    if (id && newname) {
      this.categoriesServer.updateCategory(newname, id).subscribe((res) => {
        this.getCategories();
      });
    }
  }

  constructor() {
  }

}
