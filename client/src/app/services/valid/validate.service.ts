import { mailRegex,idRegex } from './../allConsts/consts';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  chackUserValidate(mail:string,id){
  var a = this.chackId(id);
  var b = this.chackMail(mail);
   if(a == true && b == true ){
    return true;
   }
  }

  chackId(id){
    return idRegex.test((id));
  }

  chackMail(mail:string){
    return mailRegex.test(mail); 
  }

  checkUserAge(age:number){
    if(age >= 18 && age < 121){
      return true;
    }
  }

  checkEditUser(user){
   var a = this.checkUserAge(user.age);
   var b = this.chackMail(user.email);
   if(a == true && b == true ){
    return true;
   }
  }

  

}
