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
      "product_ids": ["BTC-USD", "ETH-USD", "XRP-USD", "SOL-USD"],
      "channels": [
          {
              "name": "ticker",
              "product_ids": ["BTC-USD", "ETH-USD", "XRP-USD", "SOL-USD"]
          }
      ]
    });

    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);

      switch(data.product_id){
        case 'BTC-USD': this.BTC_RATE.next({sell: data.best_ask, buy: data.best_bid, high: data.high_24h, low: data.low_24h, volume: data.volume_24h}); break;
        case 'ETH-USD': this.ETH_RATE.next({sell: data.best_ask, buy: data.best_bid, high: data.high_24h, low: data.low_24h, volume: data.volume_24h}); break;
        case 'XRP-USD': this.XRP_RATE.next({sell: data.best_ask, buy: data.best_bid, high: data.high_24h, low: data.low_24h, volume: data.volume_24h}); break;
        case 'SOL-USD': this.SOL_RATE.next({sell: data.best_ask, buy: data.best_bid, high: data.high_24h, low: data.low_24h, volume: data.volume_24h}); break;
      }
  };
}
