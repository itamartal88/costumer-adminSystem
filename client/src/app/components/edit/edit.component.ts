import { HttpService } from './../../services/http/http.service';
import { AppService } from './../../services/app/app.service';
import { Component, OnInit,Input } from '@angular/core';
import { ValidateService } from './../../services/valid/validate.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() user:any;
  @Input() checkIfAdmin:any;
  public editValid:boolean = false;
  public img:File;
  constructor(public app:AppService,public validService:ValidateService,
   public http:HttpService) { }

  ngOnInit() {
  }

  goToHomePage(){
    this.app.changeShowEdit(false);
    this.app.changeShowHome(true);
    if(this.checkIfAdmin.role == 'admin'){
      this.app.changeShowAdmin(true);
    }
  }

  editUser(user){
    var formData = new FormData();
    if(this.img != undefined && this.img[0] != undefined){
      formData.append('img', this.img[0]);
    }
    formData.append('user', JSON.stringify(user));
    this.http.editUser(formData).subscribe((res) => {
      if(res.res.ok == 1){
        this.user.img = res.user.img;
        alert('successfully updated');
        this.goToHomePage();
      }else{
        alert('was problem with update please try again');
      }
    })
  }

  checkValid(user){
  if(user.age != undefined && user.email.length > 0 && user.gender != undefined){
    var checkEditValid = this.validService.checkEditUser(user);
    if(checkEditValid == true){
      this.editValid = true;
    }else{
      this.editValid = false;
    }
  }else{
    this.editValid = false;
  }
  }

  changeImg(event,user){
  this.img = event.target.files;
  this.checkValid(user);
  }

}
