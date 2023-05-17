import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CustomersListComponent} from "./component/customers-list/customers-list.component";
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CustomersListComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should have background-image for project base', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.background')).toBeTruthy();
  });

  it('should contain a CustomerList component to render a table for showing customer', () => {
    const listComponent = fixture.debugElement.query(By.directive(CustomersListComponent));
    expect(listComponent).toBeTruthy();
  });

});
