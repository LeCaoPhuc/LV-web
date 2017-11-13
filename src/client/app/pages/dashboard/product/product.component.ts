import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../../shared/index';
import { Router } from '@angular/router';
/**
 * This class represents the lazy loaded ProductComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
})
export class ProductComponent implements OnInit {
  private listProduct: Array<any>;
  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.listProduct = [
      {
        id: 'djdjdjds',
        name: 'Sản phẩm 1',
        category: 'Ngành hàng 1',
        image: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        price: '199.000',
        stockStatus: 'instock',
      }
    ]
  }

  showProductDetails(args: any) {
    var index = args.currentTarget.children[0].innerText - 1;
		this.sharedService.setShareData('currentProduct', this.listProduct[index]);
		this.router.navigate(['dashboard/product/' + this.listProduct[index].id]);
  }

  onAddButtonTap(args: any) {
		this.router.navigate(['dashboard/product/new']);
  }

}
