import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluechartComponent } from './bluechart.component';

describe('BluechartComponent', () => {
  let component: BluechartComponent;
  let fixture: ComponentFixture<BluechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
