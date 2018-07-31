import { url } from './../allConsts/consts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http:HttpClient) { }

  checkIfUserExcist(user):Observable<any>{
    return this.http.post(url + 'login/checkUser',user);
  }

  insertUserToDb(user):Observable<any>{
    return this.http.post(url + 'login/inserUser',user);
  }

  checkAuthUser():Observable<any>{
    return this.http.get(url + 'Auth/users/getUser');
  }

  deleteUser(user):Observable<any>{
    return this.http.post(url + 'Auth/users/delete',user);
  }

  editUser(formData):Observable<any>{
    return this.http.put(url + 'Auth/users/edit',formData);
  }

  checkId(user):Observable<any>{
    return this.http.post(url + 'login/checkId',user);
  }
  
  insertAdminToDb(admin):Observable<any>{
    return this.http.post(url + 'Auth/users/insertAdmin',admin);
  }
}
