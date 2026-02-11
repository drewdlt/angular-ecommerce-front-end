import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { last } from 'rxjs';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  onSubmit() {
    console.log('Handling the submit button');

    console.log(this.checkoutFormGroup.get('customer')!.value);

    console.log(
      `The email address is ${this.checkoutFormGroup.get('customer')?.get('email')?.value}`,
    );
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value,
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
}
