import { Injectable } from '@angular/core'
import { UserRegisterModel, UserLoginModel, UserModel } from '../models'
import { Http } from '@angular/http'
import * as env from '../../../env'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { CookieService } from 'ngx-cookie'


@Injectable()
export class AuthService {
    
    get isLoggedIn(): boolean {
        return !!this._cookieService.get('token')
    }

    constructor(private _http: Http, private _cookieService: CookieService) { }

    register(user: UserRegisterModel): Observable<{}> {
        return this._http.post(`${env.domainAddress}/register`, user)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()))
    }

    login(user: UserLoginModel): Observable<{ token: string }> {
        return this._http.post(`${env.domainAddress}/login`, user)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()))
    }

    logout() {
        this._cookieService.remove('token')
    }

    checkToken(token: { token: string }) {
        return this._http.post(`${env.domainAddress}/check`, token)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()))
    }
}