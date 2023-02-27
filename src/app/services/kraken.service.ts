import { Injectable } from '@angular/core';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})

export class KrakenService extends BaseCryptoexchangerService{
  private pairs = [
    "BTC/USD", "ETH/USD", "XRP/USD", "SOL/USD", "ADA/USD", "BNB/USD", "DOGE/USD", "MATIC/USD", "HBAR/USD", "LTC/USD", "AAVE/USD",
    "ETH/XBT", "XRP/XBT", "SOL/XBT", "ADA/XBT", "BNB/XBT", "DOGE/XBT", "MATIC/XBT", "HBAR/XBT", "LTC/XBT", "AAVE/USD",
    "XBT/ETH", "XRP/ETH", "SOL/ETH", "ADA/ETH", "BNB/ETH", "DOGE/ETH", "MATIC/ETH", "HBAR/ETH", "LTC/ETH", "AAVE/USD",
  ]
  constructor() {
    super();
    this.WEBSOCKET_URL = "wss://ws.kraken.com/";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({ event: "subscribe", subscription: {name: "ticker"}, pair: this.pairs });

    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);
      
      if (data[2] === 'ticker'){    
        this.TICKER_STREAM.next(data);
      }
  };
}
