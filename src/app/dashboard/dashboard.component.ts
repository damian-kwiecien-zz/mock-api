import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService, MockResponseService } from '../../shared/services'
import { HttpMethod, Dict, HttpMethodEnum } from '../../shared/others'
import { MockResponse, MockResponseAddModel } from '../../shared/models'
import { ActivatedRoute } from '@angular/router';
declare var ace//: AceAjax.Ace
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  HttpMethodEnum = HttpMethodEnum

  private _mockResponses: MockResponse[] = []

  set mockResponses(value: MockResponse[]) {
    this._mockResponses = this.sortMockResponsesAlphabetically(value)
  }

  get mockResponses(): MockResponse[] {
    return this._mockResponses
  }
  // ||
  // [{ name: 'aa', body: 'aaa', id: 1, endpoint: 'end', method: 'get' },
  // { name: 'aAWGa', body: 'aaAWFa', id: 2, endpoint: 'end', method: 'put' },
  // { name: 'aaAF', body: 'aAWFaa', id: 3, endpoint: 'enAWDd', method: 'get' }]

  mockResponse: MockResponse | MockResponseAddModel = {
    method: HttpMethodEnum.get
  } as MockResponseAddModel

  session
  editor
  errors: [string, string][] = []

  constructor(private route: ActivatedRoute, private _authService: AuthService, private _mockResponseService: MockResponseService) { }

  ngOnInit() {
    this.mockResponses = this.route.snapshot.data['mockResponses']
  }

  ngAfterViewInit() {
    this.initEditor()
  }

  private initEditor() {
    this.editor = ace.edit("editor")
    this.editor.setTheme("ace/theme/monokai")

    this.session = this.editor.getSession()
    this.session.setMode("ace/mode/json")

    this.session.on('change', (e) => {
      this.mockResponse.body = this.session.getValue()
    })
  }

  private sortMockResponsesAlphabetically(responses: MockResponse[]) {
    return responses.sort((a,b) => a.name.localeCompare(b.name))
  }

  addMockResponse() {
    this.mockResponse = { method: HttpMethodEnum.get } as MockResponseAddModel
  }

  selectMockResponse(response: MockResponse) {
    this.mockResponse = { ...response }
    this.session.setValue(response.body)
  }

  saveMockResponse() {
    if ((this.mockResponse as MockResponse).id)
      this.updateMockResponse()
    else
      this.createMockResponse()
  }

  private createMockResponse() {
    const response = this.mockResponse as MockResponseAddModel

    this._mockResponseService.createMockResponse(response)
      .subscribe(r => {
        this.mockResponses = [...this.mockResponses, r]
      }, err => {
        this.errors = Object.entries(err)
      })
  }

  private updateMockResponse() {
    const response = this.mockResponse as MockResponse
    const { name, method, body, endpoint } = response

    this._mockResponseService.updateMockResponse(response.id, { name, method, body, endpoint })
      .subscribe(r => {
        this.mockResponses = [...this.mockResponses.filter(r2 => r2.id != r.id), r]
      }, err => {
        this.errors = Object.entries(err)
      })
  }

  deleteMockResponse() {
    const response = this.mockResponse as MockResponse

    this._mockResponseService.deleteMockResponse(response.id)
      .subscribe(r => {
        this.mockResponses = this.mockResponses.filter(r2 => r2.id != r.id)
        this.addMockResponse()
      }, err => {
        this.errors = Object.entries(err)
      })
  }

}
