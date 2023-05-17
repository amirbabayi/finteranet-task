import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomersListComponent} from './customers-list.component';

describe('CustomersListComponent', () => {
  let component: CustomersListComponent;
  let fixture: ComponentFixture<CustomersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have table for showing customer', () => {
    expect(fixture.nativeElement.querySelector('[data-test="table-customer"]')).toBeTruthy()
  });

  it('should have container', () => {
    expect(fixture.nativeElement.querySelector('[data-test="component-container"]')).toBeTruthy()
  });

  it('should have create new customer button', () => {
    expect(fixture.nativeElement.querySelector('[data-test="new-customer"]')).toBeTruthy()
  });
});
