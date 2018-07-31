import { AppService } from './../../services/app/app.service';
import { HttpService } from './../../services/http/http.service';
import { LoginGuard } from './../../guards/login/login.guard';
import { ValidateService } from './../../services/valid/validate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public header:string = 'Login Page'
  public loginValid:boolean = false;
  public nameValid:boolean;
  public idValid:boolean;
  public nameError:string;
  public idError:string;
  public userName:string;
  public userId:string;
  constructor(public validService:ValidateService,public router:Router,
  public loginGuard:LoginGuard,public http:HttpService,
  public appService:AppService ) { }

  ngOnInit() {
  }

  getError(event){
    if(this.userId != undefined && this.userName != undefined){
     var valid = this.validService.chackId(this.userId);
     if(valid == true && this.userId.length == 9 && this.userName.length > 1){
       this.loginValid = true;
     }else{
      this.loginValid = false; 
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
      case 'id':
      var chackId = this.validService.chackId(this.userId);
      if(chackId == false || this.userId.length != 9){
        this.idValid = true;  
        this.idError = 'Insert Only Numbers & 9 Digits' 
      }else{this.idValid = false}
      break;
    }
  }

  login(){
      var obj = {
      name:this.userName,
      id:this.userId
     }
    this.http.checkIfUserExcist(obj).subscribe((res) => {
      if(res.user.length > 0){
        console.log(res);
        this.appService.token = res.token;
        this.appService.changeUserName(res.user[0].name);
        this.appService.changeUserRole(res.user[0].role);
        this.loginGuard.Auth = true;
        this.router.navigate(['home']);
      }else{
        alert('Name Or Password Wrong, please try again');
      }
    })
  }
  
}



