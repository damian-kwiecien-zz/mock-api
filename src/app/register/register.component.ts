import { Component } from '@angular/core';
import { AuthService } from '../../shared/services'
import { UserRegisterModel } from '../../shared/models'
import { Dict } from '../../shared/others'
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string
  password: string
  confirmPassword: string

  errors: Dict<string> = {}

  constructor(private _authService: AuthService, private _router: Router) { }

  register() {
    const user = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    } as UserRegisterModel

    this._authService.register(user).subscribe(_ => {
      this.errors = {}
      console.log('aw wad ');
      
      this._router.navigate(['/login'])
    }, err => {
      this.errors = err
    })
  }
}
