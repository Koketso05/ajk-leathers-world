import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: IProduct[];
  rowData$: Observable<IProduct[]>;
  subscription: Subscription;
  items: IProduct[] = [];
  itemCount: number;

  // font awesome icons
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private productService: ProductsService, public dialog: MatDialog) {
    this.rowData$ = this.productService.getProducts();
   }

   public openDialog(productId: string): void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(productId);
      }
    });
   }

  reloadItems(params): void {
    // if (!this.tableResource) return;

    // this.tableResource.query(params)
    //   .then(items => this.items = items);
  }

  filter(query: string): void {
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit(): void {
  }

}
