import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage {
  cuid = null;
  password = null;
  pwdError = false;
  cuidError = false;
  invalidAccount = false;
  validationErrorMessage = '';
  constructor(
    private loginService: LoginService,
    private appService: AppService,
    private storage: StorageService
  ) { }

  validateLogin() {
    alert("Hi");
    this.cuidError = !this.validCuid() || !this.cuid;
    this.pwdError = !this.validPwd() || !this.password;
    if ((this.cuid && !this.cuidError) && (this.password && !this.pwdError)
    ) {
      let reqObj = {
        "id": this.cuid.toString(),
        "password": this.password.toString()
      }
      this.loginService.validateLogin(reqObj).subscribe(resp => {
        if (resp) {
          this.invalidAccount = false;
          this.storage.setLocalStorage("user", {
            role: resp,
            id: this.cuid
          });
          this.appService.redirectTo('home');
        } else {
          this.validationErrorMessage = "Please enter valid cuid and password";
          this.invalidAccount = true;
        }
      }, err => {
        this.validationErrorMessage = "Unable to process the request";
        this.invalidAccount = true;
      })
    }
  }
  validCuid() {
    this.cuidError = false;
    return (this.cuid && this.cuid.trim().length == 7);
  }

  validPwd() {
    this.pwdError = false;
    return this.password && this.password.trim().length >= 1;
  }

}
