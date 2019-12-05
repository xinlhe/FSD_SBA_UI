import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesectorchartComponent } from './singlesectorchart.component';

describe('SinglesectorchartComponent', () => {
  let component: SinglesectorchartComponent;
  let fixture: ComponentFixture<SinglesectorchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglesectorchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglesectorchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
