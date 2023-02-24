import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService extends BaseCryptoexchangerService{  
  constructor() {    
    super();
    this.WEBSOCKET_URL = "wss://ws-feed.exchange.coinbase.com";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({
      "type": "subscribe",
      "product_ids": ["BTC-USD", "ETH-USD", "XRP-USD", "SOL-USD", "ADA-USD", "BNB-USD", "DOGE-USD", "MATIC-USD", "HBAR-USD", "LTC-USD"],
      "channels": [
          {
              "name": "ticker",
              "product_ids": ["BTC-USD", "ETH-USD", "XRP-USD", "SOL-USD", "ADA-USD", "BNB-USD", "DOGE-USD", "MATIC-USD", "HBAR-USD", "LTC-USD"]
          }
      ]
    });

    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);    

      switch(data.product_id){
        case 'BTC-USD': this.BTC_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'ETH-USD': this.ETH_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'XRP-USD': this.XRP_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'SOL-USD': this.SOL_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'ADA/USD': this.ADA_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'BNB-USD': this.BNB_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'DOGE-USD': this.DOGE_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'HBAR-USD': this.HBAR_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'LTC-USD': this.LTC_RATE.next({price: data.price, volume: data.volume_24h}); break;
        case 'MATIC-USD': this.MATIC_RATE.next({price: data.price, volume: data.volume_24h}); break;
      }
  };
}
