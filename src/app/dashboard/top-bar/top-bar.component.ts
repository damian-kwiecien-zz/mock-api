import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent { 
  @Output() readonly export: EventEmitter<void> = new EventEmitter<void>()

  emitExportEvent() {
    this.export.emit()
  }

}
