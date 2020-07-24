import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ColoresService } from "./services/colores.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColoresComponent } from './components/colores/colores.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { Interceptor } from "./interceptor";


@NgModule({
  declarations: [
    AppComponent,
    ColoresComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    ColoresService,
    {
    provide : HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
