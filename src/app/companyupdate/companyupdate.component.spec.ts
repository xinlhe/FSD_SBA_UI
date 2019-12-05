import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyupdateComponent } from './companyupdate.component';

describe('CompanyupdateComponent', () => {
  let component: CompanyupdateComponent;
  let fixture: ComponentFixture<CompanyupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
