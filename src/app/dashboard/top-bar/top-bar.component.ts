import { Component, Output, EventEmitter, Input } from '@angular/core'
import { MockResponse } from '../../../shared/models'

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent { 
  @Output() readonly export: EventEmitter<void> = new EventEmitter<void>()
  @Input() mockResponse: MockResponse

  emitExportEvent() {
    this.export.emit()
  }

}
