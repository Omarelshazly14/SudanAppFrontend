import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { MyAuthService } from '../../Services/myAuth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  public isUserAuthenticated: boolean = false;

  constructor(
    private _authService: MyAuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isUserAuthenticated = this._authService.isAuthenticated();
  }
  public login = () => {
    this.router.navigateByUrl('/login')
  }
  public logout = () => {
    this.router.navigateByUrl('/login')
  }
}
