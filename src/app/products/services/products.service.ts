import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IProduct } from '../models/product.model';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private db = firebase.database();
  private timeOutPeriod = 3000;

  constructor(private toastr: ToastrService) { }

  public getProducts(): Observable<IProduct[]> {
    const productsRef = this.db.ref('products');
    const $products = new Subject<IProduct[]>();
    const products = new Array<IProduct>();
    productsRef.on('value', (snapshot) => {
      snapshot.forEach( x => {
        products.push({...x.val(), $key: x.key});
        $products.next(products);
      });
    });
    return $products;
  }

  public getProduct(productId: string): Observable<IProduct> {
    const productsRef = this.db.ref('products/' + productId);
    const $product = new Subject<IProduct>();
    productsRef.on('value', (snapshot) => {
      $product.next({...snapshot.val(), $key: snapshot.key});
    });
    return $product;
  }

  public deleteProduct(productId: string): void {
    const toatTitle = `Remove product`;
    const productsRef = this.db.ref('products/' + productId);
    // show the spinner
    productsRef.remove().then(() => {
      // hide the spinner
      this.toastr.success(`Remove succeeded.`, toatTitle, {
        timeOut: this.timeOutPeriod,
      });
    }).catch((error) => {
      // hide the spinner
      this.toastr.success(`Remove failed: ${error.message}`, toatTitle, {
        timeOut: this.timeOutPeriod,
      });
    });
  }

  public addProduct(product: IProduct): any {
    const toatTitle = 'save product';
    const productListRef = this.db.ref('products/');
    const newProductListRef = productListRef.push();
    newProductListRef.set(product, (error) => {
      if (error) {
        this.toastr.error('Product failed to be added to the database', toatTitle, {
          timeOut: this.timeOutPeriod,
        });
      } else {
        this.toastr.success('Product added successfully', toatTitle, {
          timeOut: this.timeOutPeriod,
        });
      }
    });

  }


}
