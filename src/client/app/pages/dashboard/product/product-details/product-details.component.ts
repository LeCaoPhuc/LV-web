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
  private productParseObj: any;
  public product: any = {
    id: '',
    name: '',
    category: '',
    image: '',
    description: '',
    // price: '',
    status: ''
  };
  public productDetail: any = {
    id: '',
    sku: '',
    material: '',
    color: '',
    price: '',
    quantity: '',
    promotion: ''
  }
  public listCategory: any;
  public productDetailList: any = [];
  public materialList: any = [];
  public colorList: any = [];
  public promotionList: any = [];
  public skuPattern: any = /[0-9]{8,8}$/;

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

    if (this.sharedService.getShareData('materialList')) {
      this.materialList = this.sharedService.getShareData('materialList');
      if (this.materialList[0].id) this.productDetail.material = this.materialList[0].id;
    } else {
      this.parse.cloud('getMaterialList', {
        limit: 10000,
        page: 1
      }).then(function (res: any) {
        self.materialList = res.data;
        if (self.materialList[0].id) self.productDetail.material = self.materialList[0].id;
        self.sharedService.setShareData('materialList', res.data);
      })
    }

    if (this.sharedService.getShareData('colorList')) {
      this.colorList = this.sharedService.getShareData('colorList');
      if (this.colorList[0].id) this.productDetail.color = this.colorList[0].id;
    } else {
      this.parse.cloud('getColorList', {
        limit: 10000,
        page: 1
      }).then(function (res: any) {
        self.colorList = res.data;
        if (self.colorList[0].id) self.productDetail.color = self.colorList[0].id;
        self.sharedService.setShareData('colorList', res.data);
      })
    }

    this.parse.cloud('getPromotionList', {}).then(function (res: any) {
      self.promotionList = res.data;
      if (self.promotionList[0].id) self.productDetail.promotion = self.promotionList[0].id;
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id'] == 'new') {
        this.product = {
          id: '',
          name: '',
          category: (self.listCategory && self.listCategory.length) ? self.listCategory[0].id : '',
          image: '',
          description: '',
          // price: '',
          status: '',
        }
      }
      else {
        this.product = this.sharedService.getShareData('currentProduct');
        if (this.product) {
          this.productParseObj = this.product;
          this.product = {
            id: this.product.id,
            name: this.product.get('product_name'),
            category: this.product.get('category').id,
            image: '',
            description: this.product.get('product_description'),
            // price: this.product.get('price'),
            status: this.product.get('status') || '',
          }
          this.getProductDetail();
        } else {
          this.parse.cloud('getProductDetailById', {
            productId: params['id']
          }).then(function (res: any) {
            self.product = res.data;
            self.productParseObj = self.product;
            self.product = {
              id: self.product.id,
              name: self.product.get('product_name'),
              category: self.product.get('category').id,
              image: '',
              description: self.product.get('product_description'),
              // price: this.product.get('price'),
              status: self.product.get('status') || '',
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

  saveProduct() {
    var self = this;
    if (!this.product || !this.product.name) return;
    this.parse.cloud('saveProduct', {
      id: this.product.id,
      product_name: this.product.name,
      category_id: this.product.category,
      description: this.product.description,
      status: this.product.status
    }).then(function (res: any) {
      console.log(res);
      self.productParseObj = res.data;
    }).catch(function (err: any) {
      console.log(err);
    })
  }

  saveProductDetail(productDetailForm: any) {
    this.parse.cloud('saveProductDetail', {
      product_id: this.product.id,
      category_id: this.product.category,
      color_id: this.productDetail.color,
      material_id: this.productDetail.material,
      promotion_id: this.productDetail.promotion,
      image: this.productDetail.image,
      price: this.productDetail.price,
      sku: this.productDetail.sku,
      quantity: this.productDetail.quantity,
      status: this.product.status,
      id: this.productDetail.id,
    })
  }

  goBack() {
    this.location.back();
  }

  changePhoto(event: any) {
    var self = this;
    var file: any = event.files[0];
    this.parse.file('product-avatar', file).then(function(file: any){
      console.log(file);
      self.productDetail.image = file;
    }).catch(function(err: any){
      console.log(err);
    })
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

  test(event: any) {
    console.log(event);
  }

}
