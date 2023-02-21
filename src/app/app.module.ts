import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoRatesComponent } from './components/crypto-rates/crypto-rates.component';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CryptoRatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
