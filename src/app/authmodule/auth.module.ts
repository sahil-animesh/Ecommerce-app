import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { enviroment } from 'src/enviroment';



const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"register/:id",component:RegisterComponent}
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
