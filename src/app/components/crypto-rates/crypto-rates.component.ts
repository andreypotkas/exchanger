import { Component, Input } from '@angular/core';
import { forkJoin, switchMap, take } from 'rxjs';
import { ITEM_RATES } from 'src/app/interfaces/cryptoExchangeItem.interface';
import { BinanceService } from 'src/app/services/binance.service';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import { KrakenService } from 'src/app/services/kraken.service';

@Component({
  selector: 'app-crypto-rates',
  templateUrl: './crypto-rates.component.html',
  styleUrls: ['./crypto-rates.component.scss']
})
export class CryptoRatesComponent {
  initRateItem = { BTC:'', ETH:'', XRP:'', SOL:'', MATIC: '', BNB:'', DOGE:'', LTC: '', ADA: '', HBAR: '', ETH_BTC: '', XRP_BTC:'', SOL_BTC:'', MATIC_BTC: '', BNB_BTC:'', DOGE_BTC:'', LTC_BTC: '', ADA_BTC: '', HBAR_BTC: '', BTC_ETH: '', XRP_ETH:'', SOL_ETH:'', MATIC_ETH: '', BNB_ETH:'', DOGE_ETH:'', LTC_ETH: '', ADA_ETH: '', HBAR_ETH: ''}
  cryptocurrencies: any[] = ['BTC', 'ETH', 'XRP', 'SOL', 'MATIC', 'BNB', 'DOGE', 'LTC', 'ADA', 'HBAR'];

  selectedCurrency1!: any;
  selectedCurrency2!: any;
  val: any = 1;

  basicData!: any;
  products!: any[];
  cols: any[] = this.cryptocurrencies.map(item => {return {field: item, header: item}});
  selectedColumns: any[] = this.cols.slice(0,4);
  KRAKEN_RATES: ITEM_RATES = {label: { name:'Kraken', color: 'violet'}, ...this.initRateItem};
  BINANCE_RATES: ITEM_RATES = {label: { name:'Binance', color: 'yellow'}, ...this.initRateItem};
  COINBASE_RATES: ITEM_RATES = {label: { name: 'Coinbase', color:'blue'}, ...this.initRateItem};
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

    this.coinbase.ETH_BTC_RATE.subscribe(data => this.COINBASE_RATES.ETH_BTC = data);
    this.coinbase.XRP_BTC_RATE.subscribe(data => this.COINBASE_RATES.XRP_BTC = data);
    this.coinbase.SOL_BTC_RATE.subscribe(data => this.COINBASE_RATES.SOL_BTC = data);
    this.coinbase.ADA_BTC_RATE.subscribe(data => this.COINBASE_RATES.ADA_BTC = data);
    this.coinbase.BNB_BTC_RATE.subscribe(data => this.COINBASE_RATES.BNB_BTC = data);
    this.coinbase.DOGE_BTC_RATE.subscribe(data => this.COINBASE_RATES.DOGE_BTC = data);
    this.coinbase.HBAR_BTC_RATE.subscribe(data => this.COINBASE_RATES.HBAR_BTC = data);
    this.coinbase.LTC_BTC_RATE.subscribe(data => this.COINBASE_RATES.LTC_BTC = data);
    this.coinbase.MATIC_BTC_RATE.subscribe(data => this.COINBASE_RATES.MATIC_BTC = data);

    this.coinbase.BTC_ETH_RATE.subscribe(data => this.COINBASE_RATES.BTC_ETH = data);
    this.coinbase.XRP_ETH_RATE.subscribe(data => this.COINBASE_RATES.XRP_ETH = data);
    this.coinbase.SOL_ETH_RATE.subscribe(data => this.COINBASE_RATES.SOL_ETH = data);
    this.coinbase.ADA_ETH_RATE.subscribe(data => this.COINBASE_RATES.ADA_ETH = data);
    this.coinbase.BNB_ETH_RATE.subscribe(data => this.COINBASE_RATES.BNB_ETH = data);
    this.coinbase.DOGE_ETH_RATE.subscribe(data => this.COINBASE_RATES.DOGE_ETH = data);
    this.coinbase.HBAR_ETH_RATE.subscribe(data => this.COINBASE_RATES.HBAR_ETH = data);
    this.coinbase.LTC_ETH_RATE.subscribe(data => this.COINBASE_RATES.LTC_ETH = data);
    this.coinbase.MATIC_ETH_RATE.subscribe(data => this.COINBASE_RATES.MATIC_ETH = data);

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
    
    this.kraken.ETH_BTC_RATE.subscribe(data => this.KRAKEN_RATES.ETH_BTC = data);
    this.kraken.XRP_BTC_RATE.subscribe(data => this.KRAKEN_RATES.XRP_BTC = data);
    this.kraken.SOL_BTC_RATE.subscribe(data => this.KRAKEN_RATES.SOL_BTC = data);
    this.kraken.ADA_BTC_RATE.subscribe(data => this.KRAKEN_RATES.ADA_BTC = data);
    this.kraken.BNB_BTC_RATE.subscribe(data => this.KRAKEN_RATES.BNB_BTC = data);
    this.kraken.DOGE_BTC_RATE.subscribe(data => this.KRAKEN_RATES.DOGE_BTC = data);
    this.kraken.HBAR_BTC_RATE.subscribe(data => this.KRAKEN_RATES.HBAR_BTC = data);
    this.kraken.LTC_BTC_RATE.subscribe(data => this.KRAKEN_RATES.LTC_BTC = data);
    this.kraken.MATIC_BTC_RATE.subscribe(data => this.KRAKEN_RATES.MATIC_BTC = data);

    this.kraken.BTC_ETH_RATE.subscribe(data => this.KRAKEN_RATES.BTC_ETH = data);
    this.kraken.XRP_ETH_RATE.subscribe(data => this.KRAKEN_RATES.XRP_ETH = data);
    this.kraken.SOL_ETH_RATE.subscribe(data => this.KRAKEN_RATES.SOL_ETH = data);
    this.kraken.ADA_ETH_RATE.subscribe(data => this.KRAKEN_RATES.ADA_ETH = data);
    this.kraken.BNB_ETH_RATE.subscribe(data => this.KRAKEN_RATES.BNB_ETH = data);
    this.kraken.DOGE_ETH_RATE.subscribe(data => this.KRAKEN_RATES.DOGE_ETH = data);
    this.kraken.HBAR_ETH_RATE.subscribe(data => this.KRAKEN_RATES.HBAR_ETH = data);
    this.kraken.LTC_ETH_RATE.subscribe(data => this.KRAKEN_RATES.LTC_ETH = data);
    this.kraken.MATIC_ETH_RATE.subscribe(data => this.KRAKEN_RATES.MATIC_ETH = data);

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

    this.binance.ETH_BTC_RATE.subscribe(data => this.BINANCE_RATES.ETH_BTC = data);
    this.binance.XRP_BTC_RATE.subscribe(data => this.BINANCE_RATES.XRP_BTC = data);
    this.binance.SOL_BTC_RATE.subscribe(data => this.BINANCE_RATES.SOL_BTC = data);
    this.binance.ADA_BTC_RATE.subscribe(data => this.BINANCE_RATES.ADA_BTC = data);
    this.binance.BNB_BTC_RATE.subscribe(data => this.BINANCE_RATES.BNB_BTC = data);
    this.binance.DOGE_BTC_RATE.subscribe(data => this.BINANCE_RATES.DOGE_BTC = data);
    this.binance.HBAR_BTC_RATE.subscribe(data => this.BINANCE_RATES.HBAR_BTC = data);
    this.binance.LTC_BTC_RATE.subscribe(data => this.BINANCE_RATES.LTC_BTC = data);
    this.binance.MATIC_BTC_RATE.subscribe(data => this.BINANCE_RATES.MATIC_BTC = data);

    this.binance.BTC_ETH_RATE.subscribe(data => this.BINANCE_RATES.BTC_ETH = data);
    this.binance.XRP_ETH_RATE.subscribe(data => this.BINANCE_RATES.XRP_ETH = data);
    this.binance.SOL_ETH_RATE.subscribe(data => this.BINANCE_RATES.SOL_ETH = data);
    this.binance.ADA_ETH_RATE.subscribe(data => this.BINANCE_RATES.ADA_ETH = data);
    this.binance.BNB_ETH_RATE.subscribe(data => this.BINANCE_RATES.BNB_ETH = data);
    this.binance.DOGE_ETH_RATE.subscribe(data => this.BINANCE_RATES.DOGE_ETH = data);
    this.binance.HBAR_ETH_RATE.subscribe(data => this.BINANCE_RATES.HBAR_ETH = data);
    this.binance.LTC_ETH_RATE.subscribe(data => this.BINANCE_RATES.LTC_ETH = data);
    this.binance.MATIC_ETH_RATE.subscribe(data => this.BINANCE_RATES.MATIC_ETH = data);
  }
}
