import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATH } from 'src/constant';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {

  constructor(private router: Router) { }
  navigateTo(route: string) {
    this.router.navigate([`${PATH.VENDOR.VENDOR}/${route}`,]);
  }
}
