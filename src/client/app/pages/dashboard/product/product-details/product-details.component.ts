import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService,ToolsService } from '../../../../shared/index';
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
  private isEdit: boolean = false;
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
  public skuPattern: any = '[0-9]{8,8}$';

  constructor(
    private sharedService: SharedService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private parse: ParseSDKService,
    private router: Router,
    public tools : ToolsService
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
      this.parse.cloud('getCategoryList', {isAdmin: true, limit: 10000, page: 1 }).then(function (res: any) {
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
        page: 1,
        isAdmin: true
      }).then(function (res: any) {
        self.productDetailList = res.data;
        console.log(self.productDetailList);
      }).catch(function (err: any) {

      })
    }
  }

  saveProduct(addProductForm: any) {
    var self = this;
    if (addProductForm.invalid) {
      for (var i in addProductForm.controls) {
        if (addProductForm.controls[i].errors) {
          $('[name=' + i + ']').addClass('invalid');
        }
      }
      return;
    }
    if (!this.product || !this.product.name) return;
    this.parse.cloud('saveProduct', {
      id: this.product.id,
      product_name: this.product.name,
      category_id: this.product.category,
      description: this.product.description,
      status: this.product.status
    }).then(function (res: any) {
      console.log(res);
      alert('Lưu thành công');
      if(res.data) {
        if(res.data[0]) {
          self.productParseObj = res.data[0].get('product');
          self.product.id = res.data[0].get('product').id;
        }
        else {
          self.productParseObj = res.data;
          self.product.id = res.data.id;
        }
      }
      
    }).catch(function (err: any) {
      console.log(err);
      alert('Lưu thất bại');
    })
  }

  saveProductDetail(productDetailForm: any) {
    if (productDetailForm.invalid) {
      for (var i in productDetailForm.controls) {
        if (productDetailForm.controls[i].errors) {
          $('[name=' + i + ']').addClass('invalid');
        }
      }
      return;
    }
    var self = this;
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
      status: this.productDetail.status,
      id: this.productDetail.id,
    }).then(function (res: any) {
      if (!self.productDetail.id) {
        self.productDetailList.push(res.data);
      } else {
        for (var i in self.productDetailList) {
          if (self.productDetail.id == self.productDetailList[i].id) {
            self.productDetailList[i] = res.data;
            break;
          }
        }
      }
      alert('Lưu thành công');
    })
    .catch(function(err){
      alert('Có lỗi trong quá trình lưu');
    })
  }

  goBack() {
    this.location.back();
  }

  changePhoto(event: any) {
    var self = this;
    var file: any = event.files[0];
    this.parse.file('product-avatar', file).then(function (file: any) {
      console.log(file);
      self.productDetail.image = file;
    }).catch(function (err: any) {
      console.log(err);
    })
    event.value = null;
  }

  bindingProductDetail(addProductDetailModal: any, product?: any) {
    addProductDetailModal.open();
    if (!product) {
      this.isEdit = false;
      this.productDetail = {
        id: '',
        sku: '',
        material: this.materialList[0].id,
        color: this.colorList[0].id,
        price: 0,
        quantity: 0,
        promotion: '',
        image: null
      }
    } else {
       this.isEdit = true;
      this.productDetail = {
        id: product.id,
        sku: product.get('sku'),
        material: product.get('material').id,
        color: product.get('color').id,
        price: product.get('price'),
        quantity: product.get('quantity'),
        promotion: product.get('promotion') ? product.get('promotion').id : '',
        image: product.get('image'),
        status: product.get('status') ? product.get('status') : ''
      }
    }
  }

  deleteProductDetail(product: any) {
    var self = this;
    var r = confirm("Bạn có muốn xóa chi tiết sản phẩm này !");
		if (r == true) {
			  this.parse.cloud('deleteProductDetail', {
          id: product.id
        }).then(function () {
          for (var i in self.productDetailList) {
            if (product.id == self.productDetailList[i].id) {
              self.productDetailList.splice(i, 1);
              break;
            }
          }
        })
		} else {
			
		}
  }

  deleteProduct() {
    var self = this;
    var r = confirm("Bạn có muốn xóa sản phẩm dùng này !");
		if (r == true) {
			  this.parse.cloud('deleteProduct', {
          id: this.product.id
        }).then(function () {
          alert('Xóa thành công');
          self.router.navigate(['dashboard/product']);
        })
        .catch(function(err){
           alert('Xóa thất bại');
           console.log(err);
        })
		} else {
			
		}
  }

  test(event: any) {
    console.log(event);
  }
  closeProductDetail(addProductDetailModal: any) {
		addProductDetailModal.close();
	}

}
