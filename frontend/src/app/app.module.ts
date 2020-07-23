import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ColoresService } from "./services/colores.service";
import { FormsModule } from '@angular/forms';
import { ColoresComponent } from './components/colores/colores.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ColoresComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
     NgbModule
  ],
  providers: [ColoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
