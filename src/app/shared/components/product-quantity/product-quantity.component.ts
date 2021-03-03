import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { IProduct } from 'src/app/products/models/product.model';
import { ShoppingCartService } from 'src/app/products/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: IProduct;
  @Input('shopping-cart') shoppingCart;
  public cartQuantity = 0;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  public getQuantity(): Observable<number> {
    return this.cartService.getCartItems().pipe(map(x => x.length));
  }

  public addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  public removeFromCart(): void {
    // this.cartService.removeFromCart(this.product);
  }
}
