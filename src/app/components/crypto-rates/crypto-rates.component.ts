import { Component, Input } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { BinanceService } from 'src/app/services/binance.service';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import { KrakenService } from 'src/app/services/kraken.service';

@Component({
  selector: 'app-crypto-rates',
  templateUrl: './crypto-rates.component.html',
  styleUrls: ['./crypto-rates.component.scss']
})
export class CryptoRatesComponent {
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  BTC_RATE: any = '';
  ETH_RATE: any = '';
  XRP_RATE: any = '';

  BTC_RATE_KRAKEN: any = '';
  ETH_RATE_KRAKEN: any = '';
  XRP_RATE_KRAKEN: any = '';
  btc_kraken_color = '';

  BTC_RATE_BINANCE: any = '';
  ETH_RATE_BINANCE: any = '';
  XRP_RATE_BINANCE: any = '';

  sellRates: any[] = [];
  buyRates: any[] = [];
  cryptoCyrrencies: any[] =[];
  exchangers: any[] =['Kraken', 'Binance', 'Coinbase'];
  cryptocurrencies: any[] = ['BTC', 'ETH', 'XRP'];

  products!: any[];
  cols!: any[];
  _selectedColumns!: any[];

  constructor(
    private coinbase: CoinbaseService,
    private kraken: KrakenService,
    private binance: BinanceService,
  ) {

  }

  ngOnInit() {
    this.coinbase.BTC_RATE.subscribe(data => this.BTC_RATE = data);
    this.coinbase.ETH_RATE.subscribe(data => this.ETH_RATE = data);
    this.coinbase.XRP_RATE.subscribe(data => this.XRP_RATE = data);

    this.kraken.BTC_RATE.subscribe(data => { 
      if( +data > +this.BTC_RATE_KRAKEN ){        
        this.btc_kraken_color = 'green';
      } else {
        this.btc_kraken_color = 'red';
      }
      this.BTC_RATE_KRAKEN = data
    });

    this.kraken.ETH_RATE.subscribe(data => this.ETH_RATE_KRAKEN = data);
    this.kraken.XRP_RATE.subscribe(data => this.XRP_RATE_KRAKEN = data);

    this.binance.BTC_RATE.subscribe(data => this.BTC_RATE_BINANCE = data);
    this.binance.ETH_RATE.subscribe(data => this.ETH_RATE_BINANCE = data);
    this.binance.XRP_RATE.subscribe(data => this.XRP_RATE_BINANCE = data);
  }


  

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
}
