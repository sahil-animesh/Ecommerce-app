import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorServiceService } from 'src/app/services/vendor-service.service';
import { PATH } from 'src/constant';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(private route:Router,private vendorservice:VendorServiceService){}

  productList:any=[];
  ngOnInit(){
    this.getProductList()
    
  }
  openAddProductForm(){
    this.route.navigate([`${PATH.VENDOR.VENDOR}/${PATH.VENDOR.HOME}/${PATH.VENDOR.ADD_PRODUCT}`,''])
  }
  editProduct(productId:string) {
    this.route.navigate([`${PATH.VENDOR.VENDOR}/${PATH.VENDOR.HOME}/${PATH.VENDOR.ADD_PRODUCT}`,productId])
  }
  deleteProduct(productId:string,index:number) {
    this.vendorservice.deleteProduct(productId).then((res)=>{
      this.productList.splice(index,1)
      this.getProductList()
    })
  }
  async getProductList(){
    (await this.vendorservice.getProducts()).forEach((doc:any) => {
      this.productList.push({...doc.data(),productId:doc.id})
    });
  }
}
