import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  { path: 'products/:p1/:p2', component: ProductComponent },
  { path: '', redirectTo: 'products/1/0', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'product-details/:url', component: ProductDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
