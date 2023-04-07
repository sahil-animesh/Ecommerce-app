import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './products/products.component';
import { PATH } from 'src/constant';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path:"",redirectTo:`${PATH.VENDOR.HOME}/${PATH.VENDOR.ORDERS}`,pathMatch:'full'},
  {path:PATH.VENDOR.HOME,component:HomeComponent,
    children:[
    {path:PATH.VENDOR.ORDERS,component:OrdersComponent},
    {path:PATH.VENDOR.PRODUCTS,component:ProductsComponent},
    {path:PATH.VENDOR.PROFILE,component:ProfileComponent},
    {path:`${PATH.VENDOR.ADD_PRODUCT}/:id`,component:AddProductComponent}
  ]},
];


@NgModule({
  declarations: [
    VendorComponent,
    OrdersComponent,
    ProfileComponent,
    ProductsComponent,
    HomeComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
})
export class VendorModule { }
