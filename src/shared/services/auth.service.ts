import { Injectable } from '@angular/core'
import { UserRegisterModel, UserLoginModel, UserModel } from '../models'
import { Http } from '@angular/http'
import * as env from '../../../env'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'


@Injectable()
export class AuthService {

    constructor(private _http: Http) { }

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

    checkToken(token: { token: string }) {
        return this._http.post(`${env.domainAddress}/check`, token)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json()))
    }
}