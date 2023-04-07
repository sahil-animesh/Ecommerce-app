import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  

  productList:Array<any>=[];
  constructor(private customer:CustomerServiceService) {}
  ngOnInit() {
    this.getProductList()

  }
  async getProductList() {
    (await this.customer.getProducts()).forEach((doc) => {
      this.productList.push(doc.data())
    });
  }

}
