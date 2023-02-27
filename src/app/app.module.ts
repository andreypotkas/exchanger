import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoRatesComponent } from './components/crypto-rates/crypto-rates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CryptoRatesComponent,
    ExchangeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
