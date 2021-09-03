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

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './componets/home/home.component';
import { AuthService } from './services/auth.service';
import { DiamantesService } from './services/diamantes.service';

//para el carousel
import {SlickCarouselModule} from 'ngx-slick-carousel';

import {AngularFirestoreModule}from '@angular/fire/firestore';
import {AngularFireStorageModule,BUCKET}from '@angular/fire/storage';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { DialogaddiamanteComponent } from './componets/dialogaddiamante/dialogaddiamante.component';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import { DialogimageComponent } from './componets/dialogimage/dialogimage.component';
import { EdtipriceComponent } from './componets/edtiprice/edtiprice.component';
import { InicioDiamantesComponent } from './componets/inicio-diamantes/inicio-diamantes.component';
import { VentaImagenesComponent } from './componets/venta-imagenes/venta-imagenes.component';
import { AddRespuestaComponent } from './componets/add-respuesta/add-respuesta.component';
 

//pdf-wraper for only load font
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { EditVentaComponent } from './componets/edit-venta/edit-venta.component';
import { PageFacturaComponent } from './componets/page-factura/page-factura.component'; // fonts provided for pdfmake
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

import { LightgalleryModule } from 'lightgallery/angular/10';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarsComponent,
    LoginComponent,
    HomeComponent,
    DialogaddiamanteComponent,
    DialogimageComponent,
    EdtipriceComponent,
    InicioDiamantesComponent,
    VentaImagenesComponent,
    AddRespuestaComponent,
    EditVentaComponent,
    PageFacturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MaterialModulesI,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    HttpClientModule,
    LightgalleryModule
    
  ],
  providers: [{provide:BUCKET,useValue:'gs://ventadiamantes-329aa.appspot.com'},AuthService,DiamantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
