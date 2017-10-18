import { Injectable } from '@angular/core'
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { CookieService } from 'ngx-cookie'

@Injectable()
export class AuthorizedHttpService {

    constructor(private _http: Http, private _cookieService: CookieService) { }

    private readonly _options: RequestOptionsArgs = {
        headers: new Headers({ 'Authorization': `Bearer ${this._cookieService.get('token')}` })
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.get(url, { ...this._options, ...options })
    }

    post(url: string, body, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.post(url, body, { ...this._options, ...options })
    }

    put(url: string, body, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.put(url, body, { ...this._options, ...options })
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.delete(url, { ...this._options, ...options })
    }
}