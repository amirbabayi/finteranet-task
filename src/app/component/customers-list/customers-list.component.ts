import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  addNewCustomer: boolean = false;
  customers: { Firstname: string, Lastname: string, PhoneNumber: string, Email: string, BankAccountNumber: string, year: string, month: string, day: string }[] = [];
  myForm!: FormGroup;
  editMode: boolean = false;
  selectedItemIndex!: number;
  duplicateEmail: boolean = false;
  duplicateInfo: boolean = false;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('customers'))
      this.customers = this.customers.concat(JSON.parse(<string>localStorage.getItem('customers')));

    if (!this.customers.length) {
      this.addNewCustomer = true;
    }

    let phoneNumberRegex = /^(\d{1,3}[- ]?)?\d{10}$/;
    let bankAccountNumberRegex = /^\d{9,18}$/;
    let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    this.myForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      PhoneNumber: ['', [Validators.pattern(phoneNumberRegex), Validators.required]],
      Email: ['', [Validators.pattern(emailRegex), Validators.required]],
      BankAccountNumber: ['', [Validators.pattern(bankAccountNumberRegex), Validators.required]],
      year: ['', Validators.required],
      month: ['', [Validators.required, Validators.max(12)]],
      day: ['', [Validators.required, Validators.max(31)]],
    });
  }

  cancel() {
    this.addNewCustomer = false;
    this.myForm.reset();
    this.editMode = false;
    this.duplicateEmail = false;
    this.duplicateInfo = false;
  }

  edit(email: string) {
    this.editMode = true;
    this.selectedItemIndex = this.customers.findIndex((item: any) => item.Email === email);
    this.myForm.patchValue(this.customers[this.selectedItemIndex]);
    this.addNewCustomer = true;
  }

  delete(email: string) {
    this.customers.splice(this.customers.findIndex((item: any) => item.Email === email), 1);
    localStorage.setItem('customers', JSON.stringify(this.customers));

    if (!this.customers.length)
      this.addNewCustomer = true;
  }

  submit() {
    this.duplicateEmail = false;
    this.duplicateInfo = false;

    if (this.myForm.invalid) return;
    let model = this.myForm.value

    if (this.editMode) {
      let customersWithOutSelectedItem = this.customers.filter((item: any) => item.Email !== this.customers[this.selectedItemIndex].Email);
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
        this.addNewCustomer = false;
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
      this.addNewCustomer = false;
      this.myForm.reset();
    }
  }

}
