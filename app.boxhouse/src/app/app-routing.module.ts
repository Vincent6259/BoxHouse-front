import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent }         from './app.component'
import { LoginComponent }       from './login/login.component'
import { RegisterComponent }    from './register/register.component'
import { HomeComponent}         from './home/home.component'
import { AccountComponent}      from './account/account.component'
import { QRcodeComponent}       from './qrcode/qrcode.component'
import { BoxComponent }         from './box/box.component'
import { ObjectComponent }      from './object/object.component'
import { ScanComponent }        from './scan/scan.component'
import { BoxSingleComponent }    from './boxsingle/boxsingle.component'


const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  { path: 'qrcode', component: QRcodeComponent},
  { path: 'box', component: BoxComponent},
  { path: 'object', component: ObjectComponent},
  { path: 'scan', component: ScanComponent},
  { path: 'boxsingle/:id', component: BoxSingleComponent},
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
