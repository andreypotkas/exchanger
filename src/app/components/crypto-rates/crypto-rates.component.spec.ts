import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoRatesComponent } from './crypto-rates.component';

describe('CryptoRatesComponent', () => {
  let component: CryptoRatesComponent;
  let fixture: ComponentFixture<CryptoRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
