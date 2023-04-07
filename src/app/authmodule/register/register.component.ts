import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupFormVendor!: FormGroup;
  signupFormCustomer!: FormGroup;
  userRole=false;
  vendor=true;
  customer=true;

  constructor(private router :Router, private firestore:FirestoreServiceService,private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.signupFormVendor = new FormGroup({
      phone: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.email, Validators.required]),
      gstNo: new FormControl('', [Validators.email, Validators.required]),
      address: new FormControl('', Validators.required),
      role: new FormControl('vendor', Validators.required)
    })
    this.signupFormCustomer = new FormGroup({
      phone: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.email, Validators.required]),
      lastName: new FormControl('', [Validators.email, Validators.required]),
      address: new FormControl('', Validators.required),
      role: new FormControl('customer', Validators.required)
    })

    this.signupFormCustomer.controls['phone'].patchValue(this.activatedroute.snapshot.paramMap?.get('id'));
    this.signupFormVendor.controls['phone'].patchValue(this.activatedroute.snapshot.paramMap?.get('id'));
  }

  onSubmit(type:string) {

    if(type=='vendor')
    {
      this.firestore.createVendor(this.signupFormVendor.value).then()
      this.router.navigate(['vendor'])
    }
    else {

      this.firestore.createUser(this.signupFormCustomer.value).then()
      this.router.navigate(['customer'])
    }
  }

  toSell(role:string) {
    if(role=='vendor')
    {
      this.vendor=false;
    }
    else {
      this.customer=false;
    }
    this.userRole=true;
  }

}
