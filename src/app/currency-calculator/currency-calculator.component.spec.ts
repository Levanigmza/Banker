import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCalculatorComponent } from './currency-calculator.component';

describe('CurrencyCalculatorComponent', () => {
  let component: CurrencyCalculatorComponent;
  let fixture: ComponentFixture<CurrencyCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyCalculatorComponent]
    });
    fixture = TestBed.createComponent(CurrencyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
