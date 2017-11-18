import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
/**
 * This class represents the lazy loaded ProductDetailsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-product-details',
  templateUrl: 'product-details.component.html',
  styleUrls: ['product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public product: any = {
    id: '',
    name: '',
    category: '',
    image: '',
    description: '',
    // price: '',
    status: ''
  };
  public listCategory: any;
  public productDetailList: any = [];

  constructor(
    private sharedService: SharedService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private parse: ParseSDKService
  ) {
    // this.product = this.sharedService.getShareData('currentProduct');

  }

  ngOnInit() {
    var self = this;
    if (this.sharedService.getShareData('caterogy')) {
      this.listCategory = this.sharedService.getShareData('caterogy');
      if (this.listCategory && this.listCategory.length && !this.product.category) {
        this.product.category = this.listCategory[0].id;
        console.log(this.product);
      }
    } else {
      this.parse.cloud('getCategoryList', { limit: 10000, page: 1 }).then(function (res: any) {
        if (res && res.data) {
          self.listCategory = res.data;
          if (self.listCategory && self.listCategory.length && (self.product && !self.product.category)) {
            self.product.category = self.listCategory[0].id;
            console.log(self.product);
          }
        }
      }).catch(function (err: any) {
        console.log(err);
      });
    }
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id'] == 'new') {
        this.product = {
          id: '',
          name: '',
          category: (self.listCategory && self.listCategory.length) ? self.listCategory[0].id: '',
          image: '',
          description: '',
          // price: '',
          status: 'instock',
        }
      }
      else {
        this.product = this.sharedService.getShareData('currentProduct');
        if (this.product) {
          this.product = {
            id: this.product.id,
            name: this.product.get('product_name'),
            category: this.product.get('category').id,
            image: '',
            description: this.product.get('product_description'),
            // price: this.product.get('price'),
            status: this.product.get('status'),
          }
          this.getProductDetail();
        } else {
          this.parse.cloud('getProductDetailById', {
            productId: params['id']
          }).then(function (res: any) {
            self.product = res.data;
            self.product = {
              id: self.product.id,
              name: self.product.get('product_name'),
              category: self.product.get('category').id,
              image: '',
              description: self.product.get('product_description'),
              // price: this.product.get('price'),
              status: self.product.get('status'),
            }
            self.getProductDetail();
          })
        }
      }
    })
  }

  getProductDetail() {
    var self = this;
    if (this.product) {
      this.parse.cloud('getProductDetailWithId', {
        id: this.product.id,
        limit: 10000,
        page: 1
      }).then(function (res: any) {
        self.productDetailList = res.data;
        console.log(self.productDetailList);
      }).catch(function (err: any) {

      })
    }
  }

  saveProduct(){
    if(!this.product || !this.product.name) return;
    this.parse.cloud('saveProduct',{
      id: this.product.id,
      product_name: this.product.name,
      category_id: this.product.category,
      description: this.product.description,
      status: this.product.status
    }).then(function(res: any){
      console.log(res);
    }).catch(function(err: any){
      console.log(err);
    })
  }

  goBack() {
    this.location.back();
  }

  changePhoto(event: any) {
    console.log(event.files[0]);
    event.value = null;
  }

  onDeleteProductButtonTap() {
    alert('onDeleteProductButtonTap');
  }

  onSaveButtonTap() {
    alert('onSaveButtonTap');
  }

  onChangeImageTap() {
    alert('onChangeImageTap');
  }

  test(event: any){
    console.log(event);
  }

}
