import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form';
import { Country } from '../../common/country';
import { State } from '../../common/state';

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

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];

  shippingStates: State[] = [];
  billingStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: Luv2ShopFormService
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

    const startMonth: number = new Date().getMonth() + 1;
    console.log(`startMonth=${startMonth}`);

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(`Retrieved credit card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      }
    );

    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log(`Retrieved credit card years: ${JSON.stringify(data)}`);
        this.creditCardYears = data;
      }
    )

    // populate countries
    this.formService.getCountries().subscribe(
      data => {
        console.log(`Retrieved countries: ${JSON.stringify(data)}`);
        this.countries = data;
      }
    );
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log(`The email address is ${this.checkoutFormGroup.get('customer')?.value.email}`);

    console.log(`The shipping address country is ${this.checkoutFormGroup.get('shippingAddress')?.value.country.name}`);
    console.log(`The shipping address state is ${this.checkoutFormGroup.get('shippingAddress')?.value.state.name}`);
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.billingStates = this.shippingStates;

      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value,
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingStates = [];
    }
  }

  handleMonthsandYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup!.value.expirationYear);

    // if the currentYear = selectedYear then start at current month
    let startMonth: number = 1;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
        data => {
          console.log(`Retrieved credit card months: ${JSON.stringify(data)}`);
          this.creditCardMonths = data
        }
    );

  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    console.log(`selectedCountry=${countryCode}`);

    this.formService.getStates(countryCode).subscribe(
      data => {
        // console.log(`Retrieved states: ${JSON.stringify(data)}`);
        if (formGroupName === 'shippingAddress') {
          this.shippingStates = data;
        }
        else {
          this.billingStates = data;
        }

        //select the first state as default
        formGroup!.get('state')?.setValue(data[0]);
      }
    )
  }

}
