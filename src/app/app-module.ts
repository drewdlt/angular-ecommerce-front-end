import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { ProductService } from './services/product';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'category/:id', component: ProductList },
  { path: 'category', component: ProductList },
  { path: 'products', component: ProductList },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    App, 
    ProductList
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
