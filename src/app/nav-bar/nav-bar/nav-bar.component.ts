import { AuthService } from './../../products/services/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import { BehaviorSubject, from, of, Subject } from 'rxjs';
import { ShoppingCartService } from 'src/app/products/services/shopping-cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCart } from 'src/app/products/models/shopping-cart.model';
import { ICart } from 'src/app/products/models/cart.model';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterViewInit  {

  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public user = '';
  private cart$: Observable<ICart[]> = new Observable<[]>();
  // private cart$: Subject<ICart[]> = new Subject<ICart[]>();
  public cartQuantity$: Observable<number> = new Observable<number>();
  public cartQuantity = 0;

  constructor(public authService: AuthService, private shoppingCartService: ShoppingCartService) { }
  async ngAfterViewInit() {

  }

  public async ngOnInit() {
    this.loggedIn$ = this.authService.loggedIn$;
    // this.setCartQuantity();
  }

  public getQuantity(): Observable<number> {
    return this.shoppingCartService.getCartItems().
    pipe(map(x => x.length));
  }

  private setCartQuantity(): void {
    //this.shoppingCartService.getCartItems()
    this.shoppingCartService.getCartItems()?.subscribe(x => {

      console.log('hhhhhhhhhhhhhhhhhhhh');
      console.log(x);
      // const itemsCount = x.val().items;
      // this.cartQuantity = Object.keys(itemsCount).length;
    });
  }

  public logIn(): any {
    this.authService.login('kjphahle@gmail.com', 'password');
    const loggedInUser  =  JSON.parse(localStorage.getItem('user'));
    if (loggedInUser !==  null) {
      console.log('logged in user is');
      console.log(loggedInUser);
      this.user = loggedInUser.user.email;
    }
  }

  public register(): any {
    this.authService.register('kjphahle@gmail.com', 'password');
  }

  public logout(): any {
    this.authService.logout();
  }

}
