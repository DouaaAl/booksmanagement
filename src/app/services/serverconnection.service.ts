import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { jwtDecode }  from "jwt-decode";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServerconnectionService {
token: string = '';
user: Object | null= null;
isValidToken: string = '';
url: string = "https://booksmanagement-production-304b.up.railway.app/api"
  constructor(private http: HttpClient){

  }
  authorizationHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json').append("authorization", `Bearer ${this.token}`)
  };
  
  updateToken(){
    if(localStorage){
      const jwt = localStorage?.getItem('jwt');
      if(jwt){
        this.token = JSON.parse(jwt).refreshToken;
      }    
    }
  }
  
  forgotPassword(info: any): Observable<any>{
    console.log("this is the email: ", info);
    let message = this.http.post(this.url + "/auth/forgotpassword", info);
    
    return message;
  }
  
  getUsers(): Observable<any>{
    return this.http.get("http://localhost:5000/api/auth")
  }
  
  getUser(){
    if(localStorage.getItem('user'))
      this.user = localStorage.getItem('user');
    else
      this.user = null
    return this.user;
  }

  getToken(){
    if(localStorage.getItem('jwt'))
      if(localStorage.getItem('jwt') != null){
         this.token = localStorage.getItem('jwt') || "string";
        this.token = JSON.parse(this.token).refreshToken;
      }
    else
      this.token = "none"
    return this.user;
  }

  login(userInfo: any): Observable<any>{
    let user= this.http.post(this.url +"/auth/login", userInfo);

    return user;
  }

  register(userInfo: any): Observable<any>{
    let userId = this.http.post(this.url + "/auth/register", userInfo);
    return userId;
  }

  logout(): Observable<any>{
    this.checkCurrentUser();
    this.checkToken();
    let userStatus = this.http.post(this.url + "/auth/logout",{}, this.authorizationHeader)
    return userStatus;
  }

  refreshToken(){
    this.http.post(this.url + "/auth/refresh", {
      refreshToken: this.token
    }).subscribe((res: any)=>{
      this.token = res.refreshToken;
      localStorage.setItem("jwt", JSON.stringify({
        refreshToken: res?.refreshToken
      }))
    })
  }

  checkToken(){
    this.http.get(this.url + "/auth/checkToken", this.authorizationHeader).subscribe((res:any)=>{
      this.isValidToken = res.message;
      if(!this.isValidToken){
        this.refreshToken();
      }
    })
  }
  checkCurrentUser() {
    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {  // Check if jwt is not null
      const data = JSON.parse(jwt);
      this.token = data.refreshToken;
      this.user = jwtDecode(data.refreshToken);
      this.authorizationHeader = {
        headers: new HttpHeaders().set('Content-Type', 'application/json').append("authorization", `Bearer ${this.token}`)
      };
      return this.user;
    } else {
      return "user not found"
    }
  }
// details page
  getDetails(): Observable<any>{
    this.getToken()
    this.checkCurrentUser();
    let details: Observable<any> = this.http.get(this.url + "/dashboard/details", this.authorizationHeader)
    return details;
  }
  // categories
  getCategories(): Observable<any> {
    let categories = this.http.get(this.url + "/category");
    return categories;
  }
  addCategory(name: String){
    let newCategory = this.http.post(this.url + "/category", {
      name: name
    })
    return newCategory
  }

  deleteCategory(name: String): Observable<any>{
    let deleteCategory = this.http.delete(this.url + `/category/${name}`);
    return deleteCategory;
  }

  updateCategory(name: String, id: Number): Observable<any>{
    let updateCategory = this.http.post(this.url + `/category/${id}`, {
      name: name
    })
    return updateCategory;
  }
  // Get Products
  getProducts(): Observable<any> {
    let products = this.http.get(this.url + "/product");
    return products;
  }

  getProductByCategory(id: Number):Observable<any>{
    let result  = this.http.post(this.url + `/product/categoryId/${id}`, {});
    return result;
  }

  addProduct(name: String,
    categoryId: Number,
    description: String,
    price: Number,
    status: String): Observable<any>{
    let newProduct = this.http.post(this.url + "/product", {
      name,
        categoryId,
        description,
        price,
        status
    })
    return newProduct
  }

  deleteProduct(id: Number): Observable<any>{
    let deleteProduct = this.http.delete(this.url + `/product/${id}`);
    return deleteProduct;
  }

  updateProduct(name: String, price: Number, id: Number,status: String, categoryId: Number, description: String): Observable<any>{
    this.checkToken();
    let data= this.http.post(this.url + `/product/${id}`, {
      name: name,
      price: price,
      status: status,
      categoryId: categoryId,
      description
    })
    return data;
  }
  // Bills
  getBills(): Observable<any> {
    let bills = this.http.get(this.url + "/bill");
    return bills;
  }
  deleteBill(id: Number): Observable<any>{
    let deleteBill = this.http.delete(this.url + `/bill/${id}`);
    return deleteBill;
  }

  updateBill(name: String, price: Number, id: Number, description: String, status: String): Observable<any>{
    let updateBill = this.http.post(this.url + `/product/${id}`, {
      name: name,
      price: price,
      description: description,
      id: id,
      status: status
    })
    return updateBill;
  }

  viewBill(billInfo: Object): Observable<any>{
    let generatedBill = this.http.post(this.url + "/bill/report/view",billInfo, this.authorizationHeader)

    return generatedBill;
  }

  // users

  deleteUser(id: Number): Observable<any>{
    this.updateToken();
    let deleteUser = this.http.delete(this.url + `/users/${id}`, this.authorizationHeader);
    return deleteUser;
  }

  updateUser(id: Number, status: String): Observable<any>{
    let updateUser = this.http.post(this.url + `/users/${id}`, {
      status: status
    });
    return updateUser;
  }

  changePassword(id: Number, password: String): Observable<any>{
    console.log("password is change with:", id," and password:", password);
    let updatePassword = this.http.post(this.url + `/users/changepassword/${id}`, {
      password: password
    })
    return updatePassword;
  }

  changeName(id: Number, name: String): Observable<any>{
    let updateName = this.http.post(this.url + `/users/changename/${id}`, {
      name: name
    })
    return updateName;
  }

  changeEmail(id: Number, email: String): Observable<any>{
    let updateEmail = this.http.post(this.url + `/users/changeemail/${id}`,{
      email: email
    })
    return updateEmail;
  }
}



