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
import { HomePageComponent } from './dashboard/home-page/home-page.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { TopBarComponent } from './dashboard/top-bar/top-bar.component'
import { LeftBarComponent } from './dashboard/left-bar/left-bar.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { SentenceCasePipe } from '../shared/pipes'


const appRoutes = [{
  path: '',
  component: HomePageComponent,
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
  canActivate: [AuthRouteGuard],
  resolve: { mockResponses: MockResponsesResolver }
},
{
  path: '**',
  component: PageNotFoundComponent
}] as Routes
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TopBarComponent,
    LeftBarComponent,
    PageNotFoundComponent,
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
