import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$: Observable<Product[]>=this.productService.product$
   .pipe(
    catchError(err=>{
      this.errorMessage=err;
      return EMPTY;
    })

   );
  sub: Subscription;

  constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  //   this.products$=this.productService.getProducts()
  //   .pipe(
  //     catchError(err=>{
  //       this.errorMessage=err;
  //       return EMPTY;
  //     })
  //   );
  //   /* this.sub = this.productService.getProducts()
  //     .subscribe(
  //       products => this.products = products,
  //       error => this.errorMessage = error
  //     ); */
  // }

 /*  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 */
  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
