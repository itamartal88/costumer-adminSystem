import { AppService } from './../../services/app/app.service';
import { HttpService } from './../../services/http/http.service';
import { LoginGuard } from './../../guards/login/login.guard';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from './../../services/valid/validate.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public header:string = 'Regiter Page'
  public loginValid:boolean = false;
  public mailValid:boolean;
  public nameValid:boolean;
  public idValid:boolean;
  public nameError:string;
  public mailError:string;
  public idError:string;
  public userName:string;
  public userMail:string;
  public userId:string;
  constructor(public validService:ValidateService,public router:Router,
  public loginGuard:LoginGuard,public http:HttpService,
  public appService:AppService) { }

  ngOnInit() {
  }

  getError(event){
    if(this.userId != undefined && this.userMail != undefined && this.userName != undefined){
     var valid = this.validService.chackUserValidate(this.userMail,this.userId);
     if(valid == true && this.userId.length == 9 && this.userName.length > 1){
       var obj = { id:this.userId };
       this.http.checkId(obj).subscribe((res) => {
         if(res.length == 0){
          this.loginValid = true;
          this.loginGuard.Auth = true;
          this.idValid = false
         }else{
          this.idValid = true; 
          this.idError = 'Id ecxist in system'; 
         }
       })
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

  signUp(){
  var obj = {
    name:this.userName,
    mail:this.userMail,
    id:this.userId
  }  
    this.http.insertUserToDb(obj).subscribe((res) => {
    this.appService.changeUserName(res.user[0].name);
    this.appService.changeUserRole(res.user[0].role);
    this.router.navigate(['home']);
    this.appService.token = res.token;
  })
  }
}
