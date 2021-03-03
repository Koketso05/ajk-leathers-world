import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { ICart } from '../models/cart.model';
import { IProduct } from '../models/product.model';
import { ShoppingCart } from '../models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private db = firebase.database();
  private $shoppingCartItems: Observable<ICart[]>;

  constructor() {
    // get cart items
    this.getCart();
  }

  private create(): any {
    const shoppingCartRef = this.db.ref().child('shopping-carts');
    return shoppingCartRef.push({
        dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string): Promise<any> {
    const cartRef = this.db.ref('shopping-carts/' + cartId + '/items/' + productId);
    return cartRef.once('value', (snapshot) => {
      return snapshot.val();
    });
  }

  public async addToCart(product: IProduct): Promise<any> {

    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, product.$key);
    itemRef.then(item => {
      const quantity = (item.quantity || 0) + 1;
      if (item.quantity || 0) {
        return this.db.ref('shopping-carts/' + cartId + '/items/' + product.$key).remove();
      } else {
        const updatedCart = {
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity
        };
        return this.db.ref('shopping-carts/' + cartId + '/items/' + product.$key).update(updatedCart);
      }
    });
  }

  public async updateItem(product: IProduct, change: number): Promise<any> {

    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, product.$key);
    itemRef.then(item => {
      const quantity = (item.quantity || 0) + change;
      if (item.quantity || 0) {
        return this.db.ref('shopping-carts/' + cartId + '/items/' + product.$key).remove();
      } else {
        const updatedCart = {
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity
        };
        return this.db.ref('shopping-carts/' + cartId + '/items/' + product.$key).update(updatedCart);
      }
    });
  }

  private async getCart(): Promise<any> {
    const cartId = await this.getOrCreateCartId();
    const shoppingCarttems: ICart[] = [];
    this.db.ref('/shopping-carts/' + cartId).on('value', (shoppingCart) => {
      const cartItem = shoppingCart.child('items').val();
      for (const item of Object.keys(cartItem)) {
        shoppingCarttems.push(cartItem[item]);
      }
      this.$shoppingCartItems = of(shoppingCarttems);
    });
  }

  public getCartItems(): Observable<ICart[]> {
    const d = this.getCart();
    this.$shoppingCartItems = from(d);
    // this.getCart().then(x => {
    //   console.log('what are my items');
    //   console.log(x);
    // });
    return this.$shoppingCartItems?.pipe(take(1), map(x => x));
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
}
