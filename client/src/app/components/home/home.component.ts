import { ValidateService } from './../../services/valid/validate.service';
import { AppService } from './../../services/app/app.service';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public allUsers:any;
  public userList:any;
  public showMoreDateails:boolean = false;
  public showEdit:boolean;
  public showUser:boolean = true;
  public currentUser:any;
  public showAdmin:boolean;
  public searchUserName:string;
  public checkIfAdmin:any;
  public showAddForm:boolean;
  public idValid:boolean = false;
  public mailValid:boolean = false;
  public nameValid:boolean = false;
  public userName:string;
  public userMail:string;
  public userId:string;
  public addValid:boolean;
  public nameError:string;
  public mailError:string;
  public idError:string;
  constructor(public app:AppService,public http:HttpService,
   public validService:ValidateService,public router:Router) { }

  ngOnInit() {
    this.http.checkAuthUser().subscribe((res) => {
      this.allUsers = res.users;
      this.app.changeUserList(this.allUsers);
      this.checkIfAdmin = res.role[0]; 
      if(res.role[0].role == 'admin'){
      this.app.changeShowAdmin(true);
      }
    })
    this.app.showEdit.subscribe(val => this.showEdit = val);
    this.app.showHome.subscribe(val => this.showUser = val);
    this.app.userList.subscribe(val => this.userList = val);
    this.app.showAdmin.subscribe(val => this.showAdmin = val);
  }
  
  deleteUser(user){
    var a =  confirm("Are You Sure You want To Delete This User");
    if(a == true){
      var inArray = this.allUsers.map(function(e) { return e._id; }).indexOf(user._id);
      this.allUsers.splice(inArray,1);
     this.http.deleteUser(user).subscribe((res) => {
      console.log(res);
     })
     if(this.allUsers.length == 0){
      this.router.navigate(['login']);
      }
   } 
  }

  showDateails(event,i){
    var a = document.getElementsByClassName('detailsDiv')[i];
    if(event.target.innerHTML == 'More Details'){
      a.classList.add("showDetails");
      event.target.innerHTML = 'Hide';
    }else{
      event.target.innerHTML = 'More Details';
      a.classList.remove("showDetails");
    }
  }

  editUser(user){
    this.currentUser = user;
    this.app.changeShowEdit(true);
    this.app.changeShowHome(false);
    this.app.changeShowAdmin(false);
  }

  searchUser(){
    if(this.searchUserName.length >= 1){
     var searchArray = [];
     for(var i = 0; i < this.allUsers.length; i++){
     if(this.allUsers[i].name.toLowerCase().indexOf(this.searchUserName.toLowerCase()) > -1){
       searchArray.push(this.allUsers[i]);
      }
     }
     this.app.changeUserList(searchArray);
     }else{
      this.app.changeUserList(this.allUsers);
    }
  }

  addAdmin(){
  this.showUser = false;
  this.showAddForm = true;
  this.showAdmin = false;
  }
 
  backHome(){
    this.showUser = true;
    this.showAddForm = false;
    this.showAdmin = true;
  }

  getError(event){
    if(this.userId != undefined && this.userMail != undefined && this.userName != undefined){
      var valid = this.validService.chackUserValidate(this.userMail,this.userId);
      if(valid == true && this.userId.length == 9 && this.userName.length > 1){
        var obj = { id:this.userId };
        this.http.checkId(obj).subscribe((res) => {
          if(res.length == 0){
           this.addValid = true;
           this.idValid = false
          }else{
           this.idValid = true; 
           this.idError = 'Id ecxist in system'; 
          }
        })
      }else{
       this.addValid = false; 
      }
     }
  this.getSwitchError(event);
  }

  getSwitchError(event){
    switch(event.target.id) {
       case 'name':
       if(event.target.value.length < 2){
         this.nameError = 'Insert At Least 2 Chars'
         this.nameValid = true;   
       }else{this.nameValid = false}
           break;
       case 'mail':
       var chackMail = this.validService.chackMail(this.userMail);
       if(chackMail == false){
         this.mailValid = true; 
         this.mailError = 'Plaese insert Valid mail'
       }else{this.mailValid = false}  
       break;
       case 'id':
       var chackId = this.validService.chackId(this.userId);
       if(chackId == false || this.userId.length != 9){
         this.idValid = true;  
         this.idError = 'Insert Only Numbers & 9 Digits' 
       }else{this.idValid = false}
       break;
     }
   }

   addOneAdmin(){
    var obj = {
      name:this.userName,
      mail:this.userMail,
      id:this.userId
    }  
    this.http.insertAdminToDb(obj).subscribe((res) => {
      this.allUsers = res;
      this.app.changeUserList(this.allUsers);
      this.showUser = true;
      this.showAddForm = false;
      this.showAdmin = true;
      this.addValid = false;
    })
   }

   getRole(role){
     if(role != 'admin'){
       return true;
     }
   }
}
