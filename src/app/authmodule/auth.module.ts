import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PATH } from 'src/constant';



const routes: Routes = [
  {path:"",redirectTo:PATH.AUTH.LOGIN,pathMatch:'full'},
  {path:PATH.AUTH.LOGIN,component:LoginComponent},
  {path:PATH.AUTH.REGISTER,component:RegisterComponent}
];


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
