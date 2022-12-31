import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from './catalogue.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: any
  categoryCurrent: any

  constructor(private catService: CatalogueService,
    private authService: AuthenticationService,
    private router: Router) { }
  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage()
    this.getCategories();
  }
  private getCategories() {
    this.catService.getResource("/categories")
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
      })
  }
  getProductByCat(c: any) {
    this.categoryCurrent = c

    this.router.navigateByUrl('/products/2/' + c.id);

  }
  onSelectedProducts() {

    this.categoryCurrent = undefined;
    this.router.navigateByUrl('/products/1/0');


  }
  onProductsPromo() {
    this.router.navigateByUrl('/products/3/0');

  }
  onProductsDispo() {
    this.router.navigateByUrl('/products/4/0');

  }
  onLogout() {
    this.authService.RomoveTokenFromTokenStorage()
    this.router.navigateByUrl('/login');
  }

}
