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
  private product: any = {
    id: '',
    name: '',
    category: '',
    image: '',
    description: '',
    price: '',
    status: ''
  };
  public listCategory: any;

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
    } else {
      this.parse.cloud('getCategoryList', { limit: 10000, page: 1 }).then(function (res: any) {
        if (res && res.data) {
          self.listCategory = res.data;
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
          category: '',
          image: '',
          description: '',
          price: '',
          status: 'instock',
        }
      }
      else {
        this.product = this.sharedService.getShareData('currentProduct');
        console.log(this.product);
        if (this.product) {
          this.product = {
            id: this.product.id,
            name: this.product.get('product').get('product_name'),
            category: this.product.get('category').id,
            image: '',
            description: this.product.get('product').get('product_description'),
            price: this.product.get('price'),
            status: this.product.get('status'),
          }
        }
      }
    })


    // if (this.product.stockStatuc != 'instock') {
    //   $('#stock-status').prop('selectedIndex', 1);
    // }

    // init drop down
    // $('#category').material_select();
    // $('#stock-status').material_select();
    // $('#color').material_select();
    // $('#material').material_select();

    //set value and enable autoresize for TextView description
    // $('#description').val(this.product.description);
    // $('#description').trigger('autoresize');
  }

  goBack() {
    this.location.back();
  }

  changePhoto(event: any){
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

}
