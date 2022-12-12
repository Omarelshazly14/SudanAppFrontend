import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MngDataService } from '../../Services/mng-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //isUserAuthenticated: any;

  constructor(
    public data: MngDataService,
    private router: Router
  ) { }

  ngOnInit(): void {

    $('#lang').val(this.data.getLang());

  }
  public login = () => {
    // this._authService.login();
    this.router.navigate(['/login']);
  }
  public logout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.data.isUserAuthenticated = this.data.isUserAdmin = false;
    this.router.navigate(['/login']);
  }
  changeLang(event: any) {
    this.data.setLangDrops(event.target.value);
    location.reload();
  }
}
