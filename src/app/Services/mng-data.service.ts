import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class MngDataService {

  private TitleSource = new BehaviorSubject('Page Title');
  Title = this.TitleSource.asObservable();

  public isUserAuthenticated: boolean = false;
  public isUserAdmin: boolean = false;
  public isUserOfficer: boolean = false;
  public isUserHR: boolean = false;
  public EmpId;
  public EmpCode;
  public GivenName;
  public FamilyName;
  public FullName;

  private LangSource = new BehaviorSubject(this.getLang());
  Lang = this.LangSource.asObservable();
  isUserHrAdmin: any;

  getLang() {
    var lang = this.cookieService.get('lang');
    if (lang) {
      if (lang == 'en' || lang == 'ar' || lang == 'enar' || lang == 'aren') {
        return lang;
      }
    }
    return 'en';
  }

  constructor(
    private cookieService: CookieService,
    private _authService: AuthService
  ) { }

  setTitle(title: string) {
    this.TitleSource.next(title)
  }

  setLangDrops(lang: string) {
    this.cookieService.put('lang', lang);
    this.LangSource.next(lang)
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  setUserData() {
    this._authService.getUser()
      .then(user => {
        if (user && user.profile) {
          this.EmpId = user.profile.EmpId;
          this.EmpCode = user.profile.EmpCode;
          this.GivenName = user.profile.GivenName;
          this.FamilyName = user.profile.FamilyName;
          this.FullName = user.profile.FullName;
        }
      });
    this._authService.getAccessToken()
      .then(token => {
        console.log(this.getDecodedAccessToken(token));
      });
  }
}
