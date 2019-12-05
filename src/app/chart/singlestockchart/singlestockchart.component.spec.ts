import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglestockchartComponent } from './singlestockchart.component';

describe('SinglestockchartComponent', () => {
  let component: SinglestockchartComponent;
  let fixture: ComponentFixture<SinglestockchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglestockchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglestockchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
