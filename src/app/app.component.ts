import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MngDataService } from './Services/mng-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SmartHRMS';
  //public userAuthenticated = false;

  constructor(
    private data: MngDataService,
    private _authService: AuthService,
  ) {
    this._authService.loginChanged
      .subscribe(userAuthenticated => {
        data.isUserAuthenticated = userAuthenticated;
      })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._authService.isAuthenticated()
        .then(userAuthenticated => {
          this.data.isUserAuthenticated = userAuthenticated;
          this.isAdmin();
          //this.isHrAdmin();
          this.isHR();
          this.isOfficer();
          this.data.setUserData()
        })
    },1000);
  }

  public isAdmin = () => {
    return this._authService.checkIfUserIsAdmin()
      .then(res => {
        this.data.isUserAdmin = res;
      })
  }
  //public isHrAdmin = () => {
  //  return this._authService.checkIfUserIsHrAdmin()
  //    .then(res => {
  //      this.data.isUserHrAdmin = res;
  //    })
  //}
  public isHR = () => {
    return this._authService.checkIfUserIsHR()
      .then(res => {
        this.data.isUserHR = res;
      })
  }
  public isOfficer = () => {
    return this._authService.checkIfUserIsOfficer()
      .then(res => {
        this.data.isUserOfficer = res;
      })
  }
}
