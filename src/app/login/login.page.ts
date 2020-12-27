import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  confirmationResult: any;

  constructor() { }
  otpSent: boolean = false;
  recaptchaVerifier;
  otpconfirmationResult: firebase.auth.ConfirmationResult;
  phoneNumber:string = "";

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  sendOTP() {
    let concatphone = "+91" + (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    firebase.auth().signInWithPhoneNumber(concatphone, this.recaptchaVerifier).then(data => {
      this.phoneNumber = concatphone;
      this.otpSent = true;
      this.confirmationResult = data;
    }).catch(err => {
      console.log(err);
    })
    }
  verifyOTP() {
    let otpphone = (<HTMLInputElement>document.getElementById("otpphone")).value;
    this.otpconfirmationResult.confirm(otpphone).then((data) => {
      console.log(data);
    // You can redirect to other protected route.
    }).catch(err => {
      console.log(err);
    })
    }
}
