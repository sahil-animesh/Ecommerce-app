import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/windowservice.service';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { DataServiceService } from 'src/app/services/data-service.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  otpForm!: FormGroup
  constructor(private router: Router, private win: WindowService,private dataservice:DataServiceService) {
    this.loginForm = new FormGroup({
      phoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    })
    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),

    })
  }

  windowRef: any;

  verificationCode!: string;

  user: any;
  form = true;



  ngOnInit() {
    this.windowRef = this.win.windowRef
    const auth = getAuth();
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response: any) => {

      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    }, auth)

    this.windowRef.recaptchaVerifier.render()
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = "+91" + this.loginForm.value.phoneNo;
    const auth = getAuth();
    signInWithPhoneNumber(auth, num, appVerifier)
      .then((result: any) => {

        this.form=false;
        this.windowRef.confirmationResult = result;

      })
      .catch((error: any) => {
        this.form=true;
        console.log(error)
      });

  }

  verifyLoginCode() {
    this.verificationCode = this.otpForm.value.otp;
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result: any) => {
        this.user = result.user;
        this.dataservice.userId=result.user.uid;
        console.log(this.dataservice.userId)
        if (result._tokenResponse.isNewUser) {
          
          this.router.navigate(['auth/register',result._tokenResponse.phoneNumber]);
        }
        else {
          this.router.navigate(['auth/register',result._tokenResponse.phoneNumber]);
        }
        localStorage.setItem('token', result.user.accessToken);

      })
      .catch((error: any) => console.log(error, "Incorrect code entered?"));
  }

}
