import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {select, Store} from "@ngrx/store";
import {getUser} from "../../store/actions";
import {User} from '../../store/reducers';
import {Observable} from "rxjs";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  customers!: Observable<User> | any;
  myForm!: FormGroup;
  editMode: boolean = false;
  selectedItemIndex!: number;
  duplicateEmail: boolean = false;
  duplicateInfo: boolean = false;


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private store: Store<User>
  ) {
  }


  ngOnInit(): void {
    this.store.dispatch({type: getUser.type});
    this.customers = this.store.pipe(select('users'));
  }

  cancel() {
    this.myForm.reset();
    this.editMode = false;
    this.duplicateEmail = false;
    this.duplicateInfo = false;
  }

  edit(email: string) {
    this.editMode = true;
    this.selectedItemIndex = this.customers.findIndex((item: any) => item.Email === email);
    this.myForm.patchValue(this.customers[this.selectedItemIndex]);
  }

  delete(email: string) {
    this.customers.splice(this.customers.findIndex((item: any) => item.Email === email), 1);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  submit() {
    this.duplicateEmail = false;
    this.duplicateInfo = false;

    if (this.myForm.invalid) return;
    let model = this.myForm.value

    if (this.editMode) {
      let customersWithOutSelectedItem = this.customers.filter((item: any) => item.Email !== this.customers[this.selectedItemIndex].email);
      customersWithOutSelectedItem.map((item: any) => {
        if (item.Email === model.Email) {
          this.duplicateEmail = true;
          return;
        }
      });

      customersWithOutSelectedItem.map((item: any) => {
        if (item.Firstname === model.Firstname && item.Lastname === model.Lastname && item.year === model.year && item.month == model.month && item.day === model.day) {
          this.duplicateInfo = true;
          return;
        }
      });

      if (!this.duplicateEmail && !this.duplicateInfo) {
        this.customers[this.selectedItemIndex] = model;
        localStorage.setItem('customers', JSON.stringify(this.customers));
        this.editMode = false;
        this.myForm.reset();
      }

      return;
    }

    this.customers.map((item: any) => {
      if (item.Email === model.Email) {
        this.duplicateEmail = true;
      }
    });

    this.customers.map((item: any) => {
      if (item.Firstname === model.Firstname && item.Lastname === model.Lastname && item.year === model.year && item.month == model.month && item.day === model.day) {
        this.duplicateInfo = true;
      }
    });

    if (!this.duplicateInfo && !this.duplicateEmail) {
      this.customers.push(model);
      localStorage.setItem('customers', JSON.stringify(this.customers));
      this.myForm.reset();
    }
  }

}
