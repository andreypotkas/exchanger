import { Component } from '@angular/core';
import { BinanceService } from 'src/app/services/binance.service';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import { KrakenService } from 'src/app/services/kraken.service';

@Component({
  selector: 'app-crypto-rates',
  templateUrl: './crypto-rates.component.html',
  styleUrls: ['./crypto-rates.component.scss']
})
export class CryptoRatesComponent {
  initRateItem = { BTC_USD:'', ETH_USD:'', XRP_USD:'', SOL_USD:'', MATIC_USD: '', BNB_USD:'', DOGE_USD:'', LTC_USD: '', ADA_USD: '', HBAR_USD: '', ETH_BTC: '', XRP_BTC:'', SOL_BTC:'', MATIC_BTC: '', BNB_BTC:'', DOGE_BTC:'', LTC_BTC: '', ADA_BTC: '', HBAR_BTC: '', BTC_ETH: '', XRP_ETH:'', SOL_ETH:'', MATIC_ETH: '', BNB_ETH:'', DOGE_ETH:'', LTC_ETH: '', ADA_ETH: '', HBAR_ETH: ''}
  cryptocurrencies: any[] = ['BTC', 'ETH', 'XRP', 'SOL', 'MATIC', 'BNB', 'DOGE', 'LTC', 'ADA', 'HBAR', 'AAVE'];

  selectedCurrency1!: any;
  selectedCurrency2!: any;
  val: any = 1;

  basicData!: any;
  products!: any[];
  cols: any[] = this.cryptocurrencies.map(item => {return {field: item, header: item}});
  selectedColumns: any[] = this.cols.slice(0,4);
  KRAKEN_RATES: any = {label: { name:'Kraken', color: 'violet'}, ...this.initRateItem};
  BINANCE_RATES: any = {label: { name:'Binance', color: 'yellow'}, ...this.initRateItem};
  COINBASE_RATES: any = {label: { name: 'Coinbase', color:'blue'}, ...this.initRateItem};
  objectKeys = Object.keys;

  constructor(
    private coinbase: CoinbaseService,
    private kraken: KrakenService,
    private binance: BinanceService,
  ) {}

  ngOnInit() {
    // this.binance.getExchangeConvertInfo().subscribe(data => console.log(data));
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

    this.kraken.TICKER_STREAM.subscribe((data: any) => {      
      const prop = data[3]?.replace('/', '_').replace('XBT', 'BTC');            
      this.KRAKEN_RATES[prop] = { price: data[1].p[0], volume: data[1].v[1] };      
    })

    this.binance.TICKER_STREAM.subscribe((data: any) => {
      const prop = data.s?.replace('USDT', '_USD');            
      this.BINANCE_RATES[prop] = {price: data.c, volume: data.v};      
    })

    this.coinbase.TICKER_STREAM.subscribe((data: any) => {      
      const prop = data.product_id?.replace('-', '_');            
      this.COINBASE_RATES[prop] = {price: data.price, volume: data.volume_24h};      
    })
  }
}
