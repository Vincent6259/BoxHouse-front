import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { LoginComponent }    from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent }     from './home/home.component';
import { Auth }              from './core/Auth';
import { AccountComponent } from './account/account.component';
import { MenuComponent } from './menu/menu.component';
import { QRcodeComponent } from './qrcode/qrcode.component';
import { ScanComponent } from './scan/scan.component';
import { BoxComponent } from './box/box.component';
import { ObjectComponent } from './object/object.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    MenuComponent,
    QRcodeComponent,
    ScanComponent,
    BoxComponent,
    ObjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],

  providers: [Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
