import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { GameFormComponent } from './game-form/game-form.component';
import { PlayerNameComponent } from './player-name/player-name.component';
import { PlayerNameService} from './player-name.service';

const ROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterFormComponent
  }
  ,
  {
    path:'home',
    component: HomeComponent
  }
   ,
  {
    path:'game-form',
    component: GameFormComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
	LoginComponent,
	RegisterFormComponent,
	HomeComponent,
	GameFormComponent,
	PlayerNameComponent
  ],
  entryComponents: [PlayerNameComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	RouterModule.forRoot(ROUTES)
  ],
  providers: [PlayerNameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
