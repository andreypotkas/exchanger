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
  cryptocurrencies: any[] = ['BTC', 'ETH', 'XRP', 'SOL', 'MATIC', 'BNB', 'DOGE', 'LTC', 'ADA', 'HBAR'];

  basicData!: any;
  products!: any[];
  cols: any[] = this.cryptocurrencies.map(item => {return {field: item, header: item}});
  selectedColumns: any[] = this.cols;

  KRAKEN_RATES: { label: any, ETH?: any, BTC?: any, XRP?: any, SOL?: any, MATIC: any, BNB: any, DOGE: any, LTC: any, ADA: any, HBAR: any } = {label: { name:'Kraken', color: 'violet'}, BTC:'', ETH:'', XRP:'', SOL:'', MATIC: '', BNB:'', DOGE:'', LTC: '', ADA: '', HBAR: ''};
  BINANCE_RATES: { label: any, ETH?: any, BTC?: any, XRP?: any, SOL?: any , MATIC: any, BNB: any, DOGE: any, LTC: any, ADA: any, HBAR: any} = {label: { name:'Binance', color: 'yellow'}, BTC:'', ETH:'', XRP:'', SOL:'', MATIC: '', BNB:'', DOGE:'', LTC: '', ADA: '', HBAR: ''};
  COINBASE_RATES: { label: any, ETH?: any, BTC?: any, XRP?: any, SOL?: any, MATIC: any, BNB: any, DOGE: any, LTC: any, ADA: any, HBAR: any } = {label: { name: 'Coinbase', color:'blue'}, BTC:'', ETH:'', XRP:'', SOL:'', MATIC: '', BNB:'', DOGE:'', LTC: '', ADA: '', HBAR: ''};
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
    this.coinbase.ADA_RATE.subscribe(data => this.COINBASE_RATES.ADA = data);
    this.coinbase.BNB_RATE.subscribe(data => this.COINBASE_RATES.BNB = data);
    this.coinbase.DOGE_RATE.subscribe(data => this.COINBASE_RATES.DOGE = data);
    this.coinbase.HBAR_RATE.subscribe(data => this.COINBASE_RATES.HBAR = data);
    this.coinbase.LTC_RATE.subscribe(data => this.COINBASE_RATES.LTC = data);
    this.coinbase.MATIC_RATE.subscribe(data => this.COINBASE_RATES.MATIC = data);

    this.kraken.BTC_RATE.subscribe(data => this.KRAKEN_RATES.BTC = data);
    this.kraken.ETH_RATE.subscribe(data => this.KRAKEN_RATES.ETH = data);
    this.kraken.XRP_RATE.subscribe(data => this.KRAKEN_RATES.XRP = data);
    this.kraken.SOL_RATE.subscribe(data => this.KRAKEN_RATES.SOL = data);
    this.kraken.ADA_RATE.subscribe(data => this.KRAKEN_RATES.ADA = data);
    this.kraken.BNB_RATE.subscribe(data => this.KRAKEN_RATES.BNB = data);
    this.kraken.DOGE_RATE.subscribe(data => this.KRAKEN_RATES.DOGE = data);
    this.kraken.HBAR_RATE.subscribe(data => this.KRAKEN_RATES.HBAR = data);
    this.kraken.LTC_RATE.subscribe(data => this.KRAKEN_RATES.LTC = data);
    this.kraken.MATIC_RATE.subscribe(data => this.KRAKEN_RATES.MATIC = data);

    this.binance.BTC_RATE.subscribe(data => this.BINANCE_RATES.BTC = data);
    this.binance.ETH_RATE.subscribe(data => this.BINANCE_RATES.ETH = data);
    this.binance.XRP_RATE.subscribe(data => this.BINANCE_RATES.XRP = data);
    this.binance.SOL_RATE.subscribe(data => this.BINANCE_RATES.SOL = data);
    this.binance.ADA_RATE.subscribe(data => this.BINANCE_RATES.ADA = data);
    this.binance.BNB_RATE.subscribe(data => this.BINANCE_RATES.BNB = data);
    this.binance.DOGE_RATE.subscribe(data => this.BINANCE_RATES.DOGE = data);
    this.binance.HBAR_RATE.subscribe(data => this.BINANCE_RATES.HBAR = data);
    this.binance.LTC_RATE.subscribe(data => this.BINANCE_RATES.LTC = data);
    this.binance.MATIC_RATE.subscribe(data => this.BINANCE_RATES.MATIC = data);
  }
}
