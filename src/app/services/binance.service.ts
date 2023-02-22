import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinanceService {

  private WEBSOCKET_URL = "wss://stream.binance.com:9443/ws/ethusdt@ticker/btcusdt@ticker/xrpusdt@ticker";
  private socket: any;
  private isgWebSocketOpen: boolean = false;

  BTC_RATE = new Subject<any>();
  ETH_RATE = new Subject<any>();
  XRP_RATE = new Subject<any>();

  publicWebSocketSubscriptionMsg: any = JSON.stringify({
    "method": "SUBSCRIBE",
    "params": [
      "BTC-210630-9000-P@ticker",
      "ETH-210630-9000-P@ticker",
      "XRP-210630-9000-P@ticker",
    ],
    "id": 1
});
  
  constructor() {
    this.openWebSocket();
  }

  openWebSocket() { 
    this.socket = new WebSocket(this.WEBSOCKET_URL);

    this.socket.onopen = () => {
      this.isgWebSocketOpen = true;
      this.sendWebSocketMessage();
    };

    this.socket.onclose = function() {
      this.isgWebSocketOpen = false;
    };

    this.socket.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      
        switch(data.s){
          case 'BTCUSDT': this.BTC_RATE.next({sell: data.a, buy: data.b}); break;
          case 'ETHUSDT': this.ETH_RATE.next({sell: data.a, buy: data.b}); break;
          case 'XRPUSDT': this.XRP_RATE.next({sell: data.a, buy: data.b}); break;
        }
    };
  }

  //function to send a message to the websocket server
  sendWebSocketMessage (){
    if (this.isgWebSocketOpen) this.socket.send(this.publicWebSocketSubscriptionMsg);
  }
}
