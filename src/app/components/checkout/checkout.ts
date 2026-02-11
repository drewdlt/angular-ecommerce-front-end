import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit{

  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      })
    });

  }

  onSubmit() {
    console.log('Handling the submit button');

    console.log(this.checkoutFormGroup.get('customer')!.value);

    console.log(`The email address is ${this.checkoutFormGroup.get('customer')?.get('email')?.value}`);
  }

}
