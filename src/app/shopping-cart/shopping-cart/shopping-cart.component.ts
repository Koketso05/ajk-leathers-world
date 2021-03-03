import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/products/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.cart$ = this.shoppingCartService.getCartItems();
  }

}
