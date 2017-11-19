import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  public loginData = {
    username: {
      value: '',
      message: 'Tài khoản không chính xác'
    },
    password: {
      value: '',
      message: ''
    }
  }
  public loginFlag: boolean = false;
  public usernamePattern = /^[a-zA-Z0-9_]{1,50}$/;
  public passwordPattern = /^[a-zA-Z0-9]{8,12}$/;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private parseService: ParseSDKService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
   
  }
  ngOnInit() {

  }

  usernameErrorMessage(event: any) {
    console.log(event);
    if (event && event.required) {
      this.loginData.username.message = 'Tài khoản không được để trống';
    }
    else {
      if (event && event.pattern) {
        this.loginData.username.message = 'Tài khoản không đúng định dạng';
      }
      else {
        this.loginData.username.message = '';
      }
    }

    this.changeDetectorRef.detectChanges();
  }
  passwordErrorMessage(event: any) {
    console.log(event);
    if (event && event.required) {
      this.loginData.password.message = 'Mật khẩu không được để trống';
    }
    else if (event && event.pattern) {
      this.loginData.password.message = 'Mật khẩu tối thiểu chứa 8 kí tự';
    } else {
      this.loginData.password.message = '';
    }

    this.changeDetectorRef.detectChanges();
  }
  onClick(login: any) {
      var self = this;
      if(login.valid) {
        this.parseService.login(this.loginData.username.value,this.loginData.password.value)
        .then(function(res: any){
          console.log(res);
          if(res && res.user && res.user.get('user_type') != 'admin') {
            self.parseService.logout()
            .then(function(result){
              alert(' Bạn không phải admin !');
            })
            .catch(function(err){
               alert(' Bạn không phải admin !');
            })
          }
          else {
            	self.router.navigate(['dashboard']);
          }
        })
        .catch(function(err: any){
          alert('Tài khoản hoặc mật khẩu không chính xác!');
          console.log('error logInadmin',err);
        })
      }
  }
}
