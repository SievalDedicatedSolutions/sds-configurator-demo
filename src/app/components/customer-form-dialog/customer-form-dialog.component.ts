import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Customer} from '@sieval/hub-client';

@Component({
  selector: 'sds-customer-form-dialog',
  templateUrl: './customer-form-dialog.component.html',
  styleUrls: ['./customer-form-dialog.component.css']
})
export class CustomerFormDialogComponent implements OnInit {
  constructor(
      private dialogRef: MatDialogRef<CustomerFormDialogComponent>,
      private fb: FormBuilder,
  ) {
    this.createForm();
  }


  customerForm: FormGroup;


  ngOnInit() {}

  onSubmit() {
    const customer: Customer = this.customerForm.value;
    let displayName = customer.firstName;
    if (customer.middleName) {
      displayName += ` ${customer.middleName}`;
    }
    if (customer.lastName) {
      displayName += ` ${customer.lastName}`;
    }
    customer.displayName = displayName;
    customer.mainAddress.name = customer.displayName;

    this.dialogRef.close(customer);
  }


  private createForm() {
    this.customerForm = this.fb.group({
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      eMail: '',
      mainAddress: this.fb.group({
        street: '',
        streetNumber: '',
        zip: '',
        city: '',
        countryCode: 'NL',
      })
    });
  }
}
