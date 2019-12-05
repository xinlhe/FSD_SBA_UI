import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulsectorchartComponent } from './mulsectorchart.component';

describe('MulsectorchartComponent', () => {
  let component: MulsectorchartComponent;
  let fixture: ComponentFixture<MulsectorchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulsectorchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulsectorchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
