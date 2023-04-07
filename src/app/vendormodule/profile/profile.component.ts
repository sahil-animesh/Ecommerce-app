import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';
import { VendorServiceService } from 'src/app/services/vendor-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  vendorProfile!: FormGroup;
  activate=true;

  constructor(private firestore:FirestoreServiceService,private vendor:VendorServiceService){}

  ngOnInit() {
    this.vendorProfile = new FormGroup({
      phone: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.email, Validators.required]),
      gstNo: new FormControl('', [Validators.email, Validators.required]),
      address: new FormControl('', Validators.required),
      role: new FormControl('vendor', Validators.required)
    })
    this.setProfileValue();
    
  }
  setProfileValue() {
    this.firestore.getData('vendor').then((res:any) => {
      Object.keys(this.vendorProfile.value).forEach(key => this.vendorProfile.controls[key].patchValue(res.data()[key]))
    })
  }

  onSubmit() {
    this.vendor.editProfile(this.vendorProfile.value).then((res) => {
      this.setProfileValue();
    })
  }

  activateForm() {
      this.activate=false
  }
}
function activateForm() {
  throw new Error('Function not implemented.');
}

