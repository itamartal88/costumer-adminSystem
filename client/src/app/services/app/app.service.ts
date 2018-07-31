import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public token:string = '';
  public userName = new BehaviorSubject<string>('');
  public role = new BehaviorSubject<string>('');
  public showHome = new BehaviorSubject<boolean>(true);
  public showEdit = new BehaviorSubject<boolean>(false);
  public showAdmin = new BehaviorSubject<boolean>(false);
  public userList = new BehaviorSubject<any>([]);
  constructor() { }

  changeUserName(val:string){
    this.userName.next(val);
  }

  changeUserRole(val:string){
    this.role.next(val);
  }

  changeShowEdit(val:boolean){
    this.showEdit.next(val);
  }
  
  changeShowHome(val:boolean){
    this.showHome.next(val);
  }

  changeUserList(val:any){
    this.userList.next(val);
  }

  changeShowAdmin(val:boolean){
    this.showAdmin.next(val);
  }
}
