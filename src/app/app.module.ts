import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ToolbarsComponent } from './componets/toolbars/toolbars.component';
import { LoginComponent } from './componets/login/login.component';
import { MaterialModulesI } from './material-module';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './componets/home/home.component';
import { AuthService } from './services/auth.service';
import { DiamantesService } from './services/diamantes.service';

//para el carousel
import {SlickCarouselModule} from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarsComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MaterialModulesI,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule
    
  ],
  providers: [AuthService,DiamantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
