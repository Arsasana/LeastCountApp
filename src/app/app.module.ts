import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import { CoolStorageModule } from 'angular2-cool-storage';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { GameFormComponent } from './game-form/game-form.component';
import { GameComponent } from './game/game.component';

import { UserAuthService } from './user-auth.service';
import { GameService} from './game.service';
import { PlayerNameService} from './player-name.service';
import { AutoCompleteService} from './auto-complete.service';
import { UserService} from './user.service';
import { ProfileComponent } from './profile/profile.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { GamerulesComponent } from './gamerules/gamerules.component';


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
    path:'profile',
    component: ProfileComponent
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
  ,
  {
    path:'game',
    component: GameComponent
  } ,
  {
    path:'gamerules',
    component: GamerulesComponent
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
	GameComponent,
	ProfileComponent,
	AutocompleteComponent,
	GamerulesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	ReactiveFormsModule,
    HttpModule,
	CoolStorageModule,
	RouterModule.forRoot(ROUTES)
  ],
  providers: [PlayerNameService,UserAuthService,GameService,AutoCompleteService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
