import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulstockchartComponent } from './mulstockchart.component';

describe('MulstockchartComponent', () => {
  let component: MulstockchartComponent;
  let fixture: ComponentFixture<MulstockchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulstockchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulstockchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
