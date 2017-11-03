import { Component, Output, EventEmitter, Input } from '@angular/core'
import { MockResponse } from '../../../shared/models'
import { AuthService } from '../../../shared/services'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent { 
  @Output() readonly importAsJson: EventEmitter<string> = new EventEmitter<string>()
  @Input() mockResponse: MockResponse
  private _reader: FileReader

  constructor (public authService: AuthService, private _router: Router, private _cookieService: CookieService) {
    this.initFileReader()
   }

  private initFileReader() {
    this._reader = new FileReader()
    this._reader.onload = (e) => {
      this.importAsJson.emit(e.target['result'])
    }
  }

  exportAsJson() {
    const a = document.createElement('a')

    a.href = `data:attachment/text,${encodeURI(this.mockResponse.body)}`
    a.target = '_blank'
    a.download = `${this.mockResponse.name || 'empty'}.json`
    a.click()
  }

  emitImportAsJsonEvent() {
    const input = document.createElement('input')
  
    input.type = 'file'
    input.addEventListener('change', e => {
      this._reader.readAsText(input.files[0])
    })
    
    input.click()
  }

  copyTokenToClipboard() {
    const token = this._cookieService.get('token')
    const input = document.createElement('input')
    input.value = token

    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
  }

  logout() {
    this.authService.logout()
    this._router.navigate(['/login'])
  }

}
