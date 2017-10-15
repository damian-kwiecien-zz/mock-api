import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { Routes, RouterModule } from '@angular/router'
import { CookieModule } from 'ngx-cookie'

import { AuthRouteGuard } from '../shared/route-guards'
import { AuthService } from '../shared/services'

import { AppComponent } from './app.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const appRoutes = [{
  path: '',
  component: DashboardComponent,
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthRouteGuard]
}] as Routes
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot()
  ],
  providers: [
    AuthRouteGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
