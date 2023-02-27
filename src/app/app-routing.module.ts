import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoRatesComponent } from './components/crypto-rates/crypto-rates.component';
import { ExchangeComponent } from './components/exchange/exchange.component';

const routes: Routes = [
  {
    path:'overview',
    component: CryptoRatesComponent,
  },
  {
    path:'',
    redirectTo:'overview',
    pathMatch:'full'
  },
  {
    path:'exchange',
    component: ExchangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
