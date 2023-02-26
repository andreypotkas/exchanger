import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCryptoexchangerService } from './base-cryptoexchanger.service';

@Injectable({
  providedIn: 'root'
})
export class BinanceService extends BaseCryptoexchangerService {
  
  constructor(private http: HttpClient) {
    super();
    this.WEBSOCKET_URL = "wss://fstream.binance.com/ws/";
    this.publicWebSocketSubscriptionMsg = JSON.stringify({
      "method": "SUBSCRIBE",
      "params": [
        "btcusdt@ticker",
        "ethusdt@ticker",
        "adausdt@ticker",
        "bnbusdt@ticker",
        "solusdt@ticker",
        "xrpusdt@ticker",
        "ltcusdt@ticker",
        "hbarusdt@ticker",
        "dogeusdt@ticker",
        "maticusdt@ticker",
      ],
      "id": 1
    });
    this.openWebSocket();
  }

  onMessage = (message: any) => {
    const data = JSON.parse(message.data);    
    this.TICKER_STREAM.next(data);
  }

  // getExchangeConvertInfo() 9211 pairs
  
  // Response:
  // {
  //   fromAsset: "AAVE",
  //   fromAssetMaxAmount: "530",
  //   fromAssetMinAmount: "0.012",
  //   toAsset: "ETH",
  //   toAssetMaxAmount: "26",
  //   toAssetMinAmount: "0.00063"
  // }
  getExchangeConvertInfo(){
    return this.http.get('https://api.binance.com/sapi/v1/convert/exchangeInfo')
  }

  getHistory(): any {
    let market = 'ETHUSDT'
    let tick_interval = '1d'

    const url = 'https://api.binance.com/api/v3/klines?symbol='+market+'&interval='+tick_interval+'&limit=30'
    const data = this.http.get(url);
    return data;
  }
}
