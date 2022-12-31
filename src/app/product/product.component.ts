import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../model/product.model.ts ';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any
  editPhoto!: boolean;
  currentProduct: any;
  selectedFiles: any;
  progress!: number;
  currentFileUpload: any;
  title!: string;
  timestamp: number = 0;

  constructor(private route: ActivatedRoute, public authService: AuthenticationService,
    public catService: CatalogueService, private router: Router) {

  }
  ngOnInit() {
    this.router.events.subscribe((val) => {
      //if url change
      if (val instanceof NavigationEnd) {
        console.log("hello")
        let url = val.url;
        console.log(url)
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {

          this.title = "selection"
          this.getProducts("/products/search/selectedProducts");
        }
        else if (p1 == 2) {
          this.title = "by category"

          let idCat = this.route.snapshot.params.p2;
          //p2 id category
          this.getProducts("/categories/" + idCat + "/products");
        }
        else if (p1 == 3) {
          this.title = "promotion"

          this.getProducts("/products/search/promoProducts");
        }
        else if (p1 == 4) {
          this.title = "produit disponible"

          this.getProducts("/products/search/dispoProducts");
        }
        else if (p1 == 5) {
          this.title = "Recherche.."

          this.getProducts("/products/search/dispoProducts");
        }
      }
    })

    let p1 = this.route.snapshot.params.p1;
    if (p1 == 1) {

      this.title = "selection"
      this.getProducts("/products/search/selectedProducts");
    }
  }

  private getProducts(url: any) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err);
      })
  }
  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }
  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {

          this.timestamp = Date.now()
        }
      }, err => {
        alert("Problème de chargement");
      })


  }
  getTs() {
    return this.timestamp
  }
  isAdmin() { return this.authService.isAdmin() }
  onProductDetails(p: Product) {
    let url = btoa(p._links.product.href)
    this.router.navigateByUrl('product-details/' + url)
  }
  onAddProductToCaddy(p: any) { }

}
