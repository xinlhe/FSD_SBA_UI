import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeaddComponent } from './exchangeadd.component';

describe('ExchangeaddComponent', () => {
  let component: ExchangeaddComponent;
  let fixture: ComponentFixture<ExchangeaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
