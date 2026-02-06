import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { ProductService } from './services/product';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';

const routes: Routes = [
  { path: 'category/:id/:name', component: ProductList },
  { path: 'category', component: ProductList },
  { path: 'products', component: ProductList },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    App, 
    ProductList, ProductCategoryMenu
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(), 
    ProductService
  ],
  bootstrap: [
    App
  ],
})
export class AppModule {}
