import { AppService } from './../../services/app/app.service';
import { Router } from '@angular/router';
import { LoginGuard } from './../../guards/login/login.guard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public role:string;
  public name:string;
  constructor(public loginGuard:LoginGuard,public router:Router,
  public appService:AppService ) { }

  ngOnInit() {
   this.appService.userName.subscribe(name => this.name = name);
   this.appService.role.subscribe(role => this.role = role); 
  }

  logOut(){
  this.loginGuard.Auth = false;
  this.router.navigate(['login']);
  this.appService.changeShowAdmin(false);
  }
  
}
