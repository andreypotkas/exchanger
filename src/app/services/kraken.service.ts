import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class KrakenService {
  private WEBSOCKET_URL = "wss://ws.kraken.com/";
  private socket: any;
  private isgWebSocketOpen: boolean = false;

  publicWebSocketSubscriptionMsg: any = JSON.stringify({ event: "subscribe", subscription: {name: "ticker"}, pair:["BTC/USD", "ETH/USD", "XRP/USD"] });
  
  BTC_RATE = new Subject<any>();
  ETH_RATE = new Subject<any>();
  XRP_RATE = new Subject<any>();

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
      if (data[2] === 'ticker'){        
        switch(data[3]){
          case 'XBT/USD': this.BTC_RATE.next({sell: data[1].a[0], buy: data[1].b[0] }); break;
          case 'ETH/USD': this.ETH_RATE.next({sell: data[1].a[0], buy: data[1].b[0] }); break;
          case 'XRP/USD': this.XRP_RATE.next({sell: data[1].a[0], buy: data[1].b[0] }); break;
        }
        
      }
    };
  }

  //function to send a message to the websocket server
  sendWebSocketMessage (){
    if (this.isgWebSocketOpen) this.socket.send(this.publicWebSocketSubscriptionMsg);
  }
}
