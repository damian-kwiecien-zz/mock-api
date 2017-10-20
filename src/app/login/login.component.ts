import { Component } from '@angular/core';
import { AuthService } from '../../shared/services'
import { Dict } from '../../shared/others'
import { UserLoginModel } from '../../shared/models'
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string
  password: string

  errors: Dict<string> = {}

  constructor(private _authService: AuthService, private _cookieService: CookieService, private _router: Router) { }

  login() {
    const user = {
      email: this.email,
      password: this.password
    } as UserLoginModel

    this._authService.login(user).subscribe(({ token }) => {
      this.errors = {}
      this._cookieService.put('token', token)
      this._router.navigate(['/dashboard'])
    }, err => {
      this.errors = err
    })
  }
}
