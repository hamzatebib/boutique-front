import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../model/product.model.ts ';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct!: Product;
  editPhoto!: boolean;
  selectedFiles: any;
  progress!: number;
  currentFileUpload: any;

  currentTime!: number;

  mode: number = 0;

  constructor(private route: ActivatedRoute,
    public catService: CatalogueService, public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url)
    console.log("myurl" + url)
    this.catService.getProduct(url).subscribe(res => {
      this.currentProduct = res;


    })
    console.log("myurl1" + this.currentProduct)
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

          this.currentTime = Date.now()
        }
      }, err => {
        alert("Problème de chargement");
      })
    this.selectedFiles = undefined

  }
  getTs() {
    return this.currentTime
  }
  isAdmin() { return this.authService.isAdmin() }

  onAddProductToCaddy(p: any) {
    /*
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
    }
    else{
      this.caddyService.addProduct(p);
    }
    /** */
  }
  onProductDetails(p: Product) {
    this.router.navigateByUrl("/product/" + p.id);
  }
  onEditProduct() {
    this.mode = 1;
  }
  onUpdateProduct(data: any) {
    /*
    let url=this.currentProduct._links.self.href;
    this.catalService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
      /** */
  }

}
