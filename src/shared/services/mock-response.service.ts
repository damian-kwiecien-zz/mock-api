import { Injectable } from '@angular/core'
import { MockResponse, MockResponseAddModel } from '../models'
import { Http } from '@angular/http'
import * as env from '../../../env'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { AuthorizedHttpService } from './authorized-http.service'

@Injectable()
export class MockResponseService {

    constructor(private _authHttp: AuthorizedHttpService) { }

    getMockResponses(): Observable<MockResponse[]> {
        return this._authHttp.get(`${env.domainAddress}/mock-responses`)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()))
    }

    createMockResponse(response: MockResponseAddModel): Observable<MockResponse> {
        return this._authHttp.post(`${env.domainAddress}/mock-responses`, response)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()))
    }

    updateMockResponse(responseId: number, response: MockResponseAddModel) {
        return this._authHttp.put(`${env.domainAddress}/mock-responses/${responseId}`, response)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()))
    }

    deleteMockResponse(responseId: number) {
        return this._authHttp.delete(`${env.domainAddress}/mock-responses/${responseId}`)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()))
    }
}