import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { OrdersComponent } from './orders/orders.component';
import { PremiumComponent } from './premium/premium.component';
import { RouterModule, Routes } from '@angular/router';
import { PATH } from 'src/constant';


const routes: Routes = [
  {path:"",redirectTo:`${PATH.CUSTOMER.CUSTOMER}/${PATH.CUSTOMER.HOME}`,pathMatch:'full'},
  {path:PATH.CUSTOMER.CUSTOMER, component:CustomerComponent,children:[
    {path:PATH.CUSTOMER.HOME,component:HomeComponent},
    {path:PATH.CUSTOMER.PREMIUM,component:PremiumComponent}
  ]}
];

@NgModule({
  declarations: [
    HomeComponent,
    CustomerComponent,
    OrdersComponent,
    PremiumComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
