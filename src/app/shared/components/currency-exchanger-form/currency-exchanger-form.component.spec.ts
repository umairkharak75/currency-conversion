import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangerFormComponent } from './currency-exchanger-form.component';

describe('CurrencyExchangerFormComponent', () => {
  let component: CurrencyExchangerFormComponent;
  let fixture: ComponentFixture<CurrencyExchangerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyExchangerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyExchangerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
