import { Injectable } from '@angular/core';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})

export class KrakenService extends BaseCryptoexchangerService{

  constructor() {
    super();
    this.WEBSOCKET_URL = "wss://ws.kraken.com/";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({ event: "subscribe", subscription: {name: "ticker"}, pair:["BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD", "ADA/USD", "BNB/USD", "DOGE/USD", "MATIC/USD", "HBAR/USD", "LTC/USD"] });

    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);
    
      if (data[2] === 'ticker'){     
        switch(data[3]){
          case 'XBT/USD': this.BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'ETH/USD': this.ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'XRP/USD': this.XRP_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'SOL/USD': this.SOL_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'ADA/USD': this.ADA_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'BNB/USD': this.BNB_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'DOGE/USD': this.DOGE_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'HBAR/USD': this.HBAR_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'LTC/USD': this.LTC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'MATIC/USD': this.MATIC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
        }
        
      }
  };
}
