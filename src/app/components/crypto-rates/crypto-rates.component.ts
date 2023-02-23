import { Component, Input } from '@angular/core';
import { forkJoin, switchMap, take } from 'rxjs';
import { BinanceService } from 'src/app/services/binance.service';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import { KrakenService } from 'src/app/services/kraken.service';

@Component({
  selector: 'app-crypto-rates',
  templateUrl: './crypto-rates.component.html',
  styleUrls: ['./crypto-rates.component.scss']
})
export class CryptoRatesComponent {
  cryptocurrencies: any[] = ['BTC', 'ETH', 'XRP', 'SOL'];

  basicData!: any;
  products!: any[];
  cols: any[] = this.cryptocurrencies.map(item => {return {field: item, header: item}});
  selectedColumns: any[] = this.cols.slice(0, 3);

  KRAKEN_RATES: { label: any, ETH?: any, BTC?: any, XRP?: any, SOL?: any } = {label: { name:'Kraken', color: 'violet'}, BTC:'', ETH:'', XRP:'', SOL:''};
  BINANCE_RATES: { label: any, ETH?: any, BTC?: any, XRP?: any, SOL?: any } = {label: { name:'Binance', color: 'yellow'}, BTC:'', ETH:'', XRP:'', SOL:''};
  COINBASE_RATES: { label: any, ETH?: any, BTC?: any, XRP?: any, SOL?: any } = {label: { name: 'Coinbase', color:'blue'}, BTC:'', ETH:'', XRP:'', SOL:''};
  objectKeys = Object.keys;

  constructor(
    private coinbase: CoinbaseService,
    private kraken: KrakenService,
    private binance: BinanceService,
  ) {}

  ngOnInit() {
    this.binance.getHistory().subscribe((data: any) => {
      this.basicData = {
        labels: data.map((item: any, index: number) => index),
        datasets: [
            {
                label: 'High ETH price in USD',
                data: data.map((item: any) => item[2]),
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Avarage Dataset price in USD',
                data: data.map((item: any) => item[1]),
                fill: false,
                borderColor: '#FFA726',
                tension: .4
            },
            {
              label: 'Low Dataset price in USD',
              data: data.map((item: any) => item[3]),
              fill: false,
              borderColor: 'purple',
              tension: .4
          }
        ]
    };
    })


    
    this.coinbase.BTC_RATE.subscribe(data => this.COINBASE_RATES.BTC = data);
    this.coinbase.ETH_RATE.subscribe(data => this.COINBASE_RATES.ETH = data);
    this.coinbase.XRP_RATE.subscribe(data => this.COINBASE_RATES.XRP = data);
    this.coinbase.SOL_RATE.subscribe(data => this.COINBASE_RATES.SOL = data);

    this.kraken.BTC_RATE.subscribe(data => this.KRAKEN_RATES.BTC = data);
    this.kraken.ETH_RATE.subscribe(data => this.KRAKEN_RATES.ETH = data);
    this.kraken.XRP_RATE.subscribe(data => this.KRAKEN_RATES.XRP = data);
    this.kraken.SOL_RATE.subscribe(data => this.KRAKEN_RATES.SOL = data);

    this.binance.BTC_RATE.subscribe(data => this.BINANCE_RATES.BTC = data);
    this.binance.ETH_RATE.subscribe(data => this.BINANCE_RATES.ETH = data);
    this.binance.XRP_RATE.subscribe(data => this.BINANCE_RATES.XRP = data);
    this.binance.SOL_RATE.subscribe(data => this.BINANCE_RATES.SOL = data);
  }
}
