import { Component, OnInit } from '@angular/core';
import { BinanceService } from 'src/app/services/binance.service';
import { CoinbaseService } from 'src/app/services/coinbase.service';
import { KrakenService } from 'src/app/services/kraken.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  cryptocurrencies: any[] = ['BTC', 'ETH', 'XRP', 'SOL', 'MATIC', 'BNB', 'DOGE', 'LTC', 'ADA', 'HBAR', 'AAVE'];
  selectedCurrency1 = this.cryptocurrencies[0];
  selectedCurrency2 = this.cryptocurrencies[1];
  cols = this.cryptocurrencies.map(item => { return { value: item }});
  val: any = 1;
  val2: any = 0;
  val3: any = 0;

  currentRates!: any;

  constructor(
    private coinbase: CoinbaseService,
    private kraken: KrakenService,
    private binance: BinanceService,
  ){}

  ngOnInit(): void {
    this.coinbase.convert(this.selectedCurrency1).subscribe((data:any) => {      
      this.val2 = data.data.rates[this.selectedCurrency2] * this.val; this.currentRates = data.data.rates;
    })

    this.binance.convert(this.selectedCurrency1).pipe(take(1)).subscribe((data:any) => {   
      const asset = data.find((item: any) => item.toAsset === this.selectedCurrency2);      
      this.val3 = (+asset.toAssetMinAmount / +asset.fromAssetMinAmount) * this.val;         
    })
  }

  onChange(){    
    this.coinbase.convert(this.selectedCurrency1).pipe(take(1)).subscribe((data:any) => {      
      this.val2 = data.data.rates[this.selectedCurrency2] * this.val; this.currentRates = data.data.rates;
    })
    this.binance.convert(this.selectedCurrency1).pipe(take(1)).subscribe((data:any) => {   
      const asset = data.find((item: any) => item.toAsset === this.selectedCurrency2);
      this.val3 = (+asset.toAssetMinAmount / +asset.fromAssetMinAmount) * this.val;         
    })
  }

  onAmountChange(){    
    this.val2 = this.currentRates[this.selectedCurrency2] * this.val;
    this.binance.convert(this.selectedCurrency1).pipe(take(1)).subscribe((data:any) => {   
      const asset = data.find((item: any) => item.toAsset === this.selectedCurrency2);
      this.val3 = (+asset.toAssetMinAmount / +asset.fromAssetMinAmount) * this.val;         
    })
  }
}
