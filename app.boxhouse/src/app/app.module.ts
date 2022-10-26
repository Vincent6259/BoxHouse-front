import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { LoginComponent }    from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent }     from './home/home.component';
import { Auth }              from './core/Auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
