import { IProduct } from './../models/product.model';
import { ICategory } from './../models/category.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductsService } from '../services/products.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<IProduct[]>;
  public categories$: Observable<string[]>;
  public cart$: Observable<ShoppingCart>;
  public showActions = true;
  public shoppingCart: ShoppingCart;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.products$ = this.productsService.getProducts();
    // this.cart$ = await this.cartService.getCart();
    this.categories$ = this.categoryService.categories$;
  }

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }

  public getQuantity(product: IProduct): number {
    // console.log('can we see items');
    // console.log(product);
    // // console.log(this.cartService.getCart());
    // this.cartService.getCart().then(x => {
    //   const itemsCount = x.val().items;
    //   console.log('pppppppppppppppppppp');
    //   console.log(x.val());
    //  // this.cartQuantity = Object.keys(itemsCount).length;
    // });
    return 0;
  }

}
