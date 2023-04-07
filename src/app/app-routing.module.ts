import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:"",redirectTo:"auth",pathMatch:'full'},
  {path:"auth",loadChildren: () => import('src/app/authmodule/auth.module').then(m => m.AuthModule)},
  {path:"vendor",loadChildren: () => import('src/app/vendormodule/vendor.module').then(m => {return m.VendorModule}), canActivate:[AuthGuardService]},
  {path:"customer",loadChildren: () => import('src/app/customerModule/customer.module').then(m => m.CustomerModule), canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
