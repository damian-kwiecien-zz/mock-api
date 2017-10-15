import { Component } from '@angular/core';
import { AuthService } from '../../shared/services'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  constructor(private _authService: AuthService) { } 
}
