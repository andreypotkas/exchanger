import { Subject } from 'rxjs';

export abstract class BaseCryptoexchangerService {

  protected WEBSOCKET_URL!: string;
  protected socket: any;
  protected isgWebSocketOpen: boolean = false;

  public TICKER_STREAM = new Subject<any>();

  protected publicWebSocketSubscriptionMsg!: any;

  protected openWebSocket() { 
    this.socket = new WebSocket(this.WEBSOCKET_URL);

    this.socket.onopen = () => {
      this.isgWebSocketOpen = true;
      this.sendWebSocketMessage();
    };

    this.socket.onclose = function() {
      this.isgWebSocketOpen = false;
    };

    this.socket.onmessage = this.onMessage;
  }

  private sendWebSocketMessage (){
    if (this.isgWebSocketOpen) this.socket.send(this.publicWebSocketSubscriptionMsg);
  }

  abstract onMessage: (message: any) => void;
}
