import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksectorchartComponent } from './stocksectorchart.component';

describe('StocksectorchartComponent', () => {
  let component: StocksectorchartComponent;
  let fixture: ComponentFixture<StocksectorchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksectorchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksectorchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
