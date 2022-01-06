import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, combineLatest, EMPTY, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

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
  // selectedCategoryId=1;

  private categorySelectedSubject=new BehaviorSubject<number>(0);
  categorySelectedAction$=this.categorySelectedSubject.asObservable();

  products$=combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$

  ]) 
   .pipe(
     map(([products,selectedCategoryId])=>
      products.filter(product=>
        selectedCategoryId?product.categoryId===selectedCategoryId:true  
        )
     ),
    catchError(err=>{
      this.errorMessage=err;
      return EMPTY;
    })

   );

   categories$=this.productCategoryService.productCategories$
    .pipe(
      catchError(err=>{
        this.errorMessage=err;
        return EMPTY;
      })
    )


   /* productsSimpleFilter$=this.productService.productsWithCategory$
    .pipe(
      map(products=>
        products.filter(product=>
          this.selectedCategoryId?product.categoryId===this.selectedCategoryId:true
          )
      )
    ) */

  sub: Subscription;

  constructor(private productService: ProductService,private productCategoryService:ProductCategoryService) { }

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
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
