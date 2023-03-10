import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService extends BaseCryptoexchangerService{  
  private pairs = [
    "BTC-USD", "ETH-USD", "XRP-USD", "SOL-USD", "ADA-USD", "BNB-USD", "DOGE-USD", "MATIC-USD", "HBAR-USD", "LTC-USD", "AAVE-USD",
    "ETH-XBT", "XRP-XBT", "SOL-XBT", "ADA-XBT", "BNB-XBT", "DOGE-XBT", "MATIC-XBT", "HBAR-XBT", "LTC-XBT", "AAVE-XBT",
    "XBT-ETH", "XRP-ETH", "SOL-ETH", "ADA-ETH", "BNB-ETH", "DOGE-ETH", "MATIC-ETH", "HBAR-ETH", "LTC-ETH", "AAVE-ETH"
  ]
  constructor(private http: HttpClient) {    
    super();
    this.WEBSOCKET_URL = "wss://ws-feed.exchange.coinbase.com";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({
      "type": "subscribe",
      "product_ids": this.pairs,
      "channels": [
          {
              "name": "ticker",
              "product_ids": this.pairs
          }
      ]
    });

    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);    
    this.TICKER_STREAM.next(data);
  };

  convert(currency: string){
    return this.http.get(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`);
  }
}
