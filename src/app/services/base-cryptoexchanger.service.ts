import { Subject } from 'rxjs';

export abstract class BaseCryptoexchangerService {

  protected WEBSOCKET_URL!: string;
  protected socket: any;
  protected isgWebSocketOpen: boolean = false;

  public BTC_RATE = new Subject<any>();
  public ETH_RATE = new Subject<any>();
  public XRP_RATE = new Subject<any>();
  public SOL_RATE = new Subject<any>();
  public ADA_RATE = new Subject<any>();
  public BNB_RATE = new Subject<any>();
  public DOGE_RATE = new Subject<any>();
  public HBAR_RATE = new Subject<any>();
  public LTC_RATE = new Subject<any>();
  public MATIC_RATE = new Subject<any>();

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
