import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})
export class BinanceService extends BaseCryptoexchangerService {
  
  constructor(private http: HttpClient) {
    super();
    this.WEBSOCKET_URL = "wss://stream.binance.com:9443/ws/ethusdt@ticker/btcusdt@ticker/xrpusdt@ticker/solusdt@ticker";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({
      "method": "SUBSCRIBE",
      "params": [
        "BTC-USD@ticker",
        "ETH-USD@ticker",
        "XRP-USD@ticker",
        "SOL-USD@ticker",
      ],
      "id": 1
    });
    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);
          console.log(data); //c
          
        switch(data.s){
          case 'BTCUSDT': this.BTC_RATE.next({sell: data.a, buy: data.b, high: data.h, low: data.l, volume: data.v}); break;
          case 'ETHUSDT': this.ETH_RATE.next({sell: data.a, buy: data.b, high: data.h, low: data.l, volume: data.v}); break;
          case 'XRPUSDT': this.XRP_RATE.next({sell: data.a, buy: data.b, high: data.h, low: data.l, volume: data.v}); break;
          case 'SOLUSDT': this.SOL_RATE.next({sell: data.a, buy: data.b, high: data.h, low: data.l, volume: data.v}); break;
        }
  }

  getHistory(): any {
    let market = 'ETHUSDT'
    let tick_interval = '1d'

    const url = 'https://api.binance.com/api/v3/klines?symbol='+market+'&interval='+tick_interval+'&limit=30'
    const data = this.http.get(url);
    return data;
  }
}
