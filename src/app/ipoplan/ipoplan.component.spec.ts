import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoplanComponent } from './ipoplan.component';

describe('IpoplanComponent', () => {
  let component: IpoplanComponent;
  let fixture: ComponentFixture<IpoplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
