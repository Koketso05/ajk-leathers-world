import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToastrModule } from 'ngx-toastr';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { MaterialModule } from './material/material.module';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsService } from './products/services/products.service';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './products/services/auth.service';
import { AuthGuardService } from './products/services/auth-guard.service';
import { CategoryService } from './products/services/category.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ShoppingCartService } from './products/services/shopping-cart.service';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ProductQuantityComponent } from './shared/components/product-quantity/product-quantity.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductListComponent,
    AboutUsComponent,
    ContactUsComponent,
    NavBarComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    OrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ModalComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    RouterModule.forRoot([
      {path: '', component: ProductListComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'my-orders', component: OrdersComponent, canActivate: [AuthGuardService]},
      {path: 'contactUs', component: ContactUsComponent},
      {path: 'shop', component: ProductListComponent},
      {path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService]},
      {path: '**', redirectTo: '/'}])
  ],
  providers: [
    ProductsService,
    AuthService,
    AuthGuardService,
    ShoppingCartService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
