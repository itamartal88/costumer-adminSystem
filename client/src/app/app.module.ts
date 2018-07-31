
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MetirialModule } from './services/material/material';
import { FormsModule } from '@angular/forms'; 
//services
import { HttpService } from './services/http/http.service';
import { ValidateService } from './services/valid/validate.service';
import { AppService } from './services/app/app.service';
import { MyHttpInterceptor } from './services/interceptor/interceptor';
//components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LoginGuard } from './guards/login/login.guard';
import { EditComponent } from './components/edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TopBarComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MetirialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent,canActivate:[LoginGuard]},
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterComponent },
    ]),
  ],
  providers: [HttpService,ValidateService,LoginGuard,AppService,
    { provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


