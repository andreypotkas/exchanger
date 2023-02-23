import { Injectable } from '@angular/core';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})

export class KrakenService extends BaseCryptoexchangerService{

  constructor() {
    super();
    this.WEBSOCKET_URL = "wss://ws.kraken.com/";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({ event: "subscribe", subscription: {name: "ticker"}, pair:["BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD"] });

    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);
    
      if (data[2] === 'ticker'){     
        switch(data[3]){
          case 'XBT/USD': this.BTC_RATE.next({sell: data[1].a[0], buy: data[1].b[0], high: data[1].h[1], low: data[1].l[1], volume: data[1].v[1] }); break;
          case 'ETH/USD': this.ETH_RATE.next({sell: data[1].a[0], buy: data[1].b[0], high: data[1].h[1], low: data[1].l[1], volume: data[1].v[1] }); break;
          case 'XRP/USD': this.XRP_RATE.next({sell: data[1].a[0], buy: data[1].b[0], high: data[1].h[1], low: data[1].l[1], volume: data[1].v[1] }); break;
          case 'SOL/USD': this.SOL_RATE.next({sell: data[1].a[0], buy: data[1].b[0], high: data[1].h[1], low: data[1].l[1], volume: data[1].v[1] }); break;
        }
        
      }
  };
}
