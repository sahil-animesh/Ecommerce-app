import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore/'
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
      firstName: new FormControl('', [Validators.email, Validators.required]),
      lastName: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    })
    this.signupFormCustomer = new FormGroup({
      phone: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.email, Validators.required]),
      lastName: new FormControl('', [Validators.email, Validators.required]),
      address: new FormControl('', Validators.required),
      
    })

    this.signupFormCustomer.controls['phone'].patchValue(this.activatedroute.snapshot.paramMap?.get('id'));
    this.signupFormVendor.controls['phone'].patchValue(this.activatedroute.snapshot.paramMap?.get('id'));
  }
  // profilePicUpload(eventData: any) {
  //   this.image = URL.createObjectURL(eventData.target.files[0]);
  //   this.signupForm.controls['image'].patchValue(this.image);

  //   let tag: any = document.getElementById('testImage');
  //   tag.src = this.image;
  // }

  onSubmit() {
    this.firestore.createUser(this.signupFormCustomer.value).then()
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
