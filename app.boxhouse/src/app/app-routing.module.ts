import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent, },
<<<<<<< HEAD
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
=======
  { path: 'register', component: RegisterComponent},
>>>>>>> 1d1aa25b353ee57ddbe09f63fb2459f47bddecf1
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
