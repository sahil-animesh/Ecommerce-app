import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL } from 'firebase/storage';
import { VendorServiceService } from 'src/app/services/vendor-service.service';
import { PATH } from 'src/constant';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  image = ''
  title = "Add Product"
  productId!: string | any;
  addProduct!: FormGroup;
  constructor(private vendorservice: VendorServiceService, private router: Router, private activateroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.addProduct = new FormGroup({
      productName: new FormControl("", Validators.required),
      productFreshness: new FormControl("", Validators.required),
      productPrice: new FormControl("", Validators.required),
      productQuantity: new FormControl("", Validators.required),
      productDescription: new FormControl("", Validators.required)
    })
    this.productId = this.activateroute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.title = "Edit Product"
      this.vendorservice.getProductData(this.productId).then((res) => {

        const data: any = res.data();
        Object.keys(this.addProduct.value).forEach((key) => { this.addProduct.controls[key].patchValue(data[key]) })
        let tag: any = document.getElementById('testImage');
        this.image = data.productImage;
        tag.src = this.image;
      })
    }
  }

  profilePicUpload(eventData: any) {

    this.vendorservice.uploadProductImage(eventData.target.files[0], eventData.target.files[0].name).then(snapshot => {
      return getDownloadURL(snapshot.ref)
    })
      .then(downloadURL => {
        let tag: any = document.getElementById('testImage');
        tag.src = downloadURL;
        this.image = downloadURL;
      })

  }
  onSubmit() {
    if (this.title == 'Add Product') {

      this.addProduct.value.vendorId = localStorage.getItem('token');
      this.addProduct.value.productImage = this.image;
      this.vendorservice.createProduct(this.addProduct.value).then((res) => {
        this.router.navigate([`${PATH.VENDOR.VENDOR}/${PATH.VENDOR.HOME}/${PATH.VENDOR.PRODUCTS}`])
      })
    }
    else {
      this.addProduct.value.vendorId = localStorage.getItem('token');
      this.addProduct.value.productImage = this.image;
      this.vendorservice.editProduct(this.productId,this.addProduct.value).then((res)=> {this.router.navigate([`${PATH.VENDOR.VENDOR}/${PATH.VENDOR.HOME}/${PATH.VENDOR.PRODUCTS}`])})
    }
  }

}
