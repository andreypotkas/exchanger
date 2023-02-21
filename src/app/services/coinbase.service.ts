import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {

  constructor(private http: HttpClient) { }

  getSellRates(){
    const sellBTC = this.http.get<any>('https://api.coinbase.com/v2/prices/BTC-USD/buy');
    const sellETH = this.http.get<any>('https://api.coinbase.com/v2/prices/ETH-USD/buy');

    return forkJoin([sellBTC, sellETH]);
  }

  getBuyRates(){
    const buyBTC = this.http.get<any>('https://api.coinbase.com/v2/prices/BTC-USD/sell');
    const buyETH = this.http.get<any>('https://api.coinbase.com/v2/prices/ETH-USD/sell');

    return forkJoin([buyBTC, buyETH]);
  }
}
