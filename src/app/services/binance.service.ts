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
    this.WEBSOCKET_URL = "wss://stream.binance.com:9443/ws/ethusdt@ticker/btcusdt@ticker/xrpusdt@ticker/solusdt@ticker/adausdt@ticker/bnbusdt@ticker/dogeusdt@ticker/hbarusdt@ticker/ltcusdt@ticker/maticusdt@ticker/ethbtc@ticker/xrpbtc@ticker/solbtc@ticker/adabtc@ticker/bnbbtc@ticker/dogebtc@ticker/hbarbtc@ticker/ltcbtc@ticker/maticbtc@ticker/btceth@ticker/xrpeth@ticker/soleth@ticker/adaeth@ticker/bnbeth@ticker/dogeeth@ticker/hbareth@ticker/ltceth@ticker/maticeth@ticker";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({
      "method": "SUBSCRIBE",
      "params": [
        "BTC-USD@ticker",
        "ETH-USD@ticker",
        "XRP-USD@ticker",
        "SOL-USD@ticker",
        "ADA-USD@ticker",
        "BNB-USD@ticker",
        "DOGE-USD@ticker",
        "HBAR-USD@ticker",
        "LTC-USD@ticker",
        "MATIC-USD@ticker",
        
        "ETH-BTC@ticker",
        "XRP-BTC@ticker",
        "SOL-BTC@ticker",
        "ADA-BTC@ticker",
        "BNB-BTC@ticker",
        "DOGE-BTC@ticker",
        "HBAR-BTC@ticker",
        "LTC-BTC@ticker",
        "MATIC-BTC@ticker",

        "BTC-ETH@ticker",
        "XRP-ETH@ticker",
        "SOL-ETH@ticker",
        "ADA-ETH@ticker",
        "BNB-ETH@ticker",
        "DOGE-ETH@ticker",
        "HBAR-ETH@ticker",
        "LTC-ETH@ticker",
        "MATIC-ETH@ticker",
      ],
      "id": 1
    });
    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);
          
        switch(data.s){
          case 'BTCUSDT': this.BTC_RATE.next({price: data.c, volume: data.v}); break;
          case 'ETHUSDT': this.ETH_RATE.next({price: data.c, volume: data.v}); break;
          case 'XRPUSDT': this.XRP_RATE.next({price: data.c, volume: data.v}); break;
          case 'SOLUSDT': this.SOL_RATE.next({price: data.c, volume: data.v}); break;
          case 'ADAUSDT': this.ADA_RATE.next({price: data.c, volume: data.v}); break;
          case 'BNBUSDT': this.BNB_RATE.next({price: data.c, volume: data.v}); break;
          case 'DOGEUSDT': this.DOGE_RATE.next({price: data.c, volume: data.v}); break;
          case 'HBARUSDT': this.HBAR_RATE.next({price: data.c, volume: data.v}); break;
          case 'LTCUSDT': this.LTC_RATE.next({price: data.c, volume: data.v}); break;
          case 'MATICUSDT': this.MATIC_RATE.next({price: data.c, volume: data.v}); break;

          case 'ETHBTC': this.ETH_BTC_RATE.next({price: data.c, volume: data.v }); break;
          case 'XRPBTC': this.XRP_BTC_RATE.next({price: data.c, volume: data.v }); break;
          case 'SOLBTC': this.SOL_BTC_RATE.next({price: data.c, volume: data.v }); break;
          case 'ADABTC': this.ADA_BTC_RATE.next({price: data.c, volume: data.v}); break;
          case 'BNBBTC': this.BNB_BTC_RATE.next({price: data.c, volume: data.v}); break;
          case 'DOGEBTC': this.DOGE_BTC_RATE.next({price: data.c, volume: data.v}); break;
          case 'HBARBTC': this.HBAR_BTC_RATE.next({price: data.c, volume: data.v}); break;
          case 'LTCBTC': this.LTC_BTC_RATE.next({price: data.c, volume: data.v}); break;
          case 'MATICBTC': this.MATIC_BTC_RATE.next({price: data.c, volume: data.v}); break;

          case 'BTCETH': this.BTC_ETH_RATE.next({price: data.c, volume: data.v }); break;
          case 'XRPETH': this.XRP_ETH_RATE.next({price: data.c, volume: data.v }); break;
          case 'SOLETH': this.SOL_ETH_RATE.next({price: data.c, volume: data.v }); break;
          case 'ADAETH': this.ADA_ETH_RATE.next({price: data.c, volume: data.v}); break;
          case 'BNBETH': this.BNB_ETH_RATE.next({price: data.c, volume: data.v}); break;
          case 'DOGEETH': this.DOGE_ETH_RATE.next({price: data.c, volume: data.v}); break;
          case 'HBARETH': this.HBAR_ETH_RATE.next({price: data.c, volume: data.v}); break;
          case 'LTCETH': this.LTC_ETH_RATE.next({price: data.c, volume: data.v}); break;
          case 'MATICETH': this.MATIC_ETH_RATE.next({price: data.c, volume: data.v}); break;
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
