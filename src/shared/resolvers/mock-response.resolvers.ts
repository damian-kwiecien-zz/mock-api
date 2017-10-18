import { Injectable } from "@angular/core"
import { Resolve } from "@angular/router"
import { MockResponse } from "../models"
import { MockResponseService } from "../services"
import { Observable } from "rxjs/Observable"

@Injectable()
export class MockResponsesResolver implements Resolve<MockResponse[]> {
    constructor(private responseService: MockResponseService) { }

    resolve(): Observable<MockResponse[]> {
        return this.responseService.getMockResponses()
    }
}