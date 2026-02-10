import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {

    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;
    
    if (this.cartItems.length > 0) {
      // find the item in the cart based on the item id
      existingCartItem = this.cartItems.find(currCartItem => currCartItem.id === theCartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // incrememnt the quantity
      existingCartItem!.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and quantity
    this.computeCartTotals();

  }

  decrementQuantity (theCartItem: CartItem) {
    theCartItem.quantity--;

    if(theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }

  }

  remove(theCartItem: CartItem) {
    console.log(`Removing: ${theCartItem.name}`);

    const itemIndex = this.cartItems.findIndex(
      currItem => currItem.id === theCartItem.id
    )

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const currCartItem of this.cartItems) {
      totalPriceValue += currCartItem.unitPrice * currCartItem.quantity;
      totalQuantityValue += currCartItem.quantity;
    }

    // publish the new values ... all subscribers will recieve the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debugging purpose
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of the cart');
    for (const currCartItem of this.cartItems) {
      const subTotalPrice = currCartItem.unitPrice * currCartItem.quantity;
      console.log(`name: ${currCartItem.name}, quantity=${currCartItem.quantity}, unitPrice=${currCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  // incrementProductQuantity(cartItem: CartItem) {
  //   cartItem.quantity++
  // }
}
