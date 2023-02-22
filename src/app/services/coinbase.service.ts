import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {

  private WEBSOCKET_URL = "wss://ws-feed.exchange.coinbase.com";
  private socket: any;
  private isgWebSocketOpen: boolean = false;

  BTC_RATE = new Subject<any>();
  ETH_RATE = new Subject<any>();
  XRP_RATE = new Subject<any>();

  publicWebSocketSubscriptionMsg: any = JSON.stringify({
    "type": "subscribe",
    "product_ids": [
        "BTC-USD",
        "ETH-USD",
        "XRP-USD"
    ],
    "channels": [
        "heartbeat",
        {
            "name": "ticker",
            "product_ids": [
                "BTC-USD",
                "ETH-USD",
                "XRP-USD"
            ]
        }
    ]
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

      
      
      if (data.type === 'ticker') {
        switch(data.product_id){
          case 'BTC-USD': this.BTC_RATE.next({sell: data.best_ask, buy: data.best_bid}); break;
          case 'ETH-USD': this.ETH_RATE.next({sell: data.best_ask, buy: data.best_bid}); break;
          case 'XRP-USD': this.XRP_RATE.next({sell: data.best_ask, buy: data.best_bid}); break;
        }
      }
    };
  }

  //function to send a message to the websocket server
  sendWebSocketMessage (){
    if (this.isgWebSocketOpen) this.socket.send(this.publicWebSocketSubscriptionMsg);
  }
}
