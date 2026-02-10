import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetails implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.listCartDetails();
  }

  listCartDetails() {
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to CartService total price
    this.cartService.totalPrice.subscribe(
      (data) => (this.totalPrice = data)
    );

    // subscribe to CartService total quantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data),
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }

}
