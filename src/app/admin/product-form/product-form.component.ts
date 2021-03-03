import { IProduct } from './../../products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/products/services/category.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public categories$;
  public productForm: FormGroup;
  private $productId: Observable<string>;
  public product: IProduct;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService) {
      this.$productId = activatedRoute.params.pipe(take(1), map(p => p.id));
    }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$;
    this.initialiseForm();
    this.getProduct();
  }

  private initialiseForm(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  private getProduct(): void {
    this.$productId.subscribe(productId => {
      this.productService.getProduct(productId)
      .pipe(take(1)).subscribe(product => {
        this.product = product;
        this.updateFormValues(product);
      });
    });
  }

  private updateFormValues(product: IProduct): void {
    if (product) {
      this.productForm.patchValue({
        title: product.title,
        imageUrl: product.imageUrl,
        category: product.category,
        description: product.description,
        price: product.price
      });
      this.productForm.updateValueAndValidity();
    }
  }

  getErrorMessage(): string {
    if (this.productForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.productForm.hasError('email') ? 'Not a valid email' : '';
  }

  public onSaveProduct(): void {
    if (this.productForm.valid) {
      const product: IProduct = this.productForm.value;
      this.productService.addProduct(product);
    }
  }

}
