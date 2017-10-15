import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { CookieService } from 'ngx-cookie'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthRouteGuard implements CanActivate {

    constructor(private _cookieService: CookieService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const canActivate = !!this._cookieService.get('token')

        if (!canActivate)
            this._router.navigate(['login'])

        return canActivate 
    }
}