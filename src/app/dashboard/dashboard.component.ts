import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService, MockResponseService } from '../../shared/services'
import { HttpMethod, Dict, HttpMethodEnum } from '../../shared/others'
import { MockResponse, MockResponseAddModel } from '../../shared/models'
import { ActivatedRoute } from '@angular/router'

declare var ace
declare var $
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  HttpMethodEnum = HttpMethodEnum

  private _mockResponsePropToPopover: Dict<any> = {}
  private _mockResponses: MockResponse[] = []

  set mockResponses(value: MockResponse[]) {
    this._mockResponses = this.sortMockResponsesAlphabetically(value)
  }

  get mockResponses(): MockResponse[] {
    return this._mockResponses
  }

  mockResponse: MockResponse | MockResponseAddModel = {
    method: HttpMethodEnum.get
  } as MockResponseAddModel

  session
  editor
  errors: Dict<string[]> = {}

  constructor(private route: ActivatedRoute, private _authService: AuthService, private _mockResponseService: MockResponseService) { }

  ngOnInit() {
    this.mockResponses = this.route.snapshot.data['mockResponses']
  }

  ngAfterViewInit() {
    this.initEditor()
    this.initPopovers()
  }

  private initEditor() {
    this.editor = ace.edit("editor")
    this.editor.setTheme("ace/theme/eclipse")

    this.session = this.editor.getSession()
    this.session.setMode("ace/mode/json")

    this.session.on('change', (e) => {
      this.mockResponse.body = this.session.getValue()
    })

    this.session.setValue('{\n\t\n}')
  }

  private initPopovers() {
    const methodPopover = $('select[name="method"][data-toggle="popover"]').popover('disable')
    const namePopover = $('input[name="name"][data-toggle="popover"]').popover('disable')
    const endpointPopover = $('input[name="endpoint"][data-toggle="popover"]').popover('disable')
    const bodyPopover = $('button[data-toggle="popover"]').popover('disable')

    this._mockResponsePropToPopover = {
      method: methodPopover,
      name: namePopover,
      endpoint: endpointPopover,
      body: bodyPopover
    }
  }

  private sortMockResponsesAlphabetically(responses: MockResponse[]) {
    return responses.sort((a, b) => a.name.localeCompare(b.name))
  }

  addMockResponse() {
    this.mockResponse = { method: HttpMethodEnum.get } as MockResponseAddModel
    this.session.setValue('{\n\t\n}')
    this.errors = {}
  }

  selectMockResponse(response: MockResponse) {
    this.mockResponse = { ...response }
    this.session.setValue(response.body)
    this.errors = {}
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
        this.selectMockResponse(r)
        console.log(this.mockResponse);
        
        this.errors = {}
        this.disablePopovers()
      }, err => {
        this.errors = err
        this.enableAndWriteErrorsToPopovers(err)
      })
  }

  private updateMockResponse() {
    const response = this.mockResponse as MockResponse
    const { name, method, body, endpoint } = response

    this._mockResponseService.updateMockResponse(response.id, { name, method, body, endpoint })
      .subscribe(r => {
        this.mockResponses = [...this.mockResponses.filter(r2 => r2.id != r.id), r]
        this.selectMockResponse(r)
        this.errors = {}
        this.disablePopovers()
      }, err => {
        this.errors = err
        this.enableAndWriteErrorsToPopovers(err)
      })
  }

  deleteMockResponse() {
    const response = this.mockResponse as MockResponse

    this._mockResponseService.deleteMockResponse(response.id)
      .subscribe(r => {
        this.mockResponses = this.mockResponses.filter(r2 => r2.id != r.id)
        this.addMockResponse()
        this.errors = {}
        this.disablePopovers()
      }, err => {
        this.errors = err
        this.enableAndWriteErrorsToPopovers(err)
      })
  }

  private enableAndWriteErrorsToPopovers(errors: Dict<string[]>) {
    Object.keys(errors).forEach(k => {
      const popover = this._mockResponsePropToPopover[k]
      const error = errors[k]

      if (popover && error) {
        popover.attr('data-content', error.join('<br>'))
        popover.popover('enable')
      }
    })
  }

  private disablePopovers() {
    Object.values(this._mockResponsePropToPopover).forEach(p => p.popover('disable'))
  }

  importAsJson(json: string) {
    this.session.setValue(json)
  }
}
