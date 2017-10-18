import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { Routes, RouterModule } from '@angular/router'
import { CookieModule } from 'ngx-cookie'

import { AuthRouteGuard } from '../shared/route-guards'
import { AuthService, MockResponseService, AuthorizedHttpService } from '../shared/services'
import { MockResponsesResolver } from '../shared/resolvers'

import { AppComponent } from './app.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { TopBarComponent } from './dashboard/top-bar/top-bar.component'
import { LeftBarComponent } from './dashboard/left-bar/left-bar.component'
import { SentenceCasePipe } from '../shared/pipes'


const appRoutes = [{
  path: '',
  component: DashboardComponent,
  resolve: { mockResponses: MockResponsesResolver }
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
    DashboardComponent,
    TopBarComponent,
    LeftBarComponent,
    SentenceCasePipe
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
    AuthService,
    AuthorizedHttpService,
    MockResponseService,
    MockResponsesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
