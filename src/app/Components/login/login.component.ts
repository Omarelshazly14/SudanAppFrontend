import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from '../../services/myAuth.service';
import { MngDataService } from 'src/app/Services/mng-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: MyAuthService,
    private router: Router,
    private data: MngDataService
    // private _authService: AuthService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  public login = () => {
    // this._authService.login();
    const val = this.form.value;

    if (val.userName && val.password) {
      this.authService.login(val.userName, val.password)
        .subscribe(
          (res) => {
            console.log(res);
            if (res.success) {
              this.setSession(res);
              this.router.navigateByUrl('/');
            }
          },
          (err) => { console.log(err) }
        );
    }
  }
  private setSession(authResult) {
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(authResult.expiresIn));
    this.data.isUserAuthenticated = this.data.isUserAdmin = true;
  }

}
