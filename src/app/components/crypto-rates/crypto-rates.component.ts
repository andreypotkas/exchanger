import { Component, Input } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { CoinbaseService } from 'src/app/services/coinbase.service';

@Component({
  selector: 'app-crypto-rates',
  templateUrl: './crypto-rates.component.html',
  styleUrls: ['./crypto-rates.component.scss']
})
export class CryptoRatesComponent {
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  sellRates: any[] = [];
  buyRates: any[] = [];
  cryptoCyrrencies: any[] =[];

  products!: any[];

  cols!: any[];

  _selectedColumns!: any[];

  constructor(private coinbase: CoinbaseService) { }

  ngOnInit() {
      this.coinbase.getSellRates().pipe(take(1), switchMap((data) => {
        console.log(data);
        
        data.forEach(data => this.cryptoCyrrencies.push(data.data.base));
        this.cols = this.cryptoCyrrencies.map(item => {return {field: item, header: item}});
        this._selectedColumns = this.cols;
        data.forEach(item => this.sellRates.push(item.data.amount));        
        return this.coinbase.getBuyRates();
      })).subscribe(data => {
        data.forEach(item => this.buyRates.push(item.data.amount));
        console.log(this.sellRates);
        console.log(this.buyRates);
        
      });
  }

  

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
}
