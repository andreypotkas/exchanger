import { Injectable } from '@angular/core';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})

export class KrakenService extends BaseCryptoexchangerService{
  private pairs = [
    "BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD", "ADA/USD", "BNB/USD", "DOGE/USD", "MATIC/USD", "HBAR/USD", "LTC/USD",
    "ETH/XBT", "XRP/XBT", "SOL/XBT", "ADA/XBT", "BNB/XBT", "DOGE/XBT", "MATIC/XBT", "HBAR/XBT", "LTC/XBT",
    "XBT/ETH", "XRP/ETH", "SOL/ETH", "ADA/ETH", "BNB/ETH", "DOGE/ETH", "MATIC/ETH", "HBAR/ETH", "LTC/ETH",
  ]
  constructor() {
    super();
    this.WEBSOCKET_URL = "wss://ws.kraken.com/";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({ event: "subscribe", subscription: {name: "ticker"}, pair:this.pairs });

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

          case 'ETH/XBT': this.ETH_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'XRP/XBT': this.XRP_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'SOL/XBT': this.SOL_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'ADA/XBT': this.ADA_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'BNB/XBT': this.BNB_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'DOGE/XBT': this.DOGE_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'HBAR/XBT': this.HBAR_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'LTC/XBT': this.LTC_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'MATIC/XBT': this.MATIC_BTC_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;

          case 'XBT/ETH': this.BTC_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'XRP/ETH': this.XRP_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'SOL/ETH': this.SOL_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1] }); break;
          case 'ADA/ETH': this.ADA_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'BNB/ETH': this.BNB_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'DOGE/ETH': this.DOGE_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'HBAR/ETH': this.HBAR_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'LTC/ETH': this.LTC_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
          case 'MATIC/ETH': this.MATIC_ETH_RATE.next({price: data[1].p[0], volume: data[1].v[1]}); break;
        }
      }
  };

  slice(str: string){
    return str.replace('/', '');
  }
}
