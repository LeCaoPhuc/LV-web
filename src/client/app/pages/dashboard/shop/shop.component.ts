import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, GetStringService, SharedService } from '../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
/**
 * This class represents the lazy loaded ShopComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-shop',
  templateUrl: 'shop.component.html',
  styleUrls: ['shop.component.css'],
})
export class ShopComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  public shopData: any = {
    username: {
      message: '',
      pattern: /^[a-zA-Z0-9 ]{1,50}$/,
      name: 'Tài khoản',
    },
    title: {
      message: '',
      pattern: /^[a-zA-Z0-9 ]{1,100}$/,
      name: 'Tiêu đề',
    },
    content: {
      message: '',
      pattern: /^[a-zA-Z0-9 ]{1,255}$/,
      name: 'Nội dung',
    },
  }
  public shopInfo: any = {
    username: '',
    title: '',
    content: ''
  }
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private parseService: ParseSDKService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
     
  }

  ngOnInit() {
    this.parseService.cloud('getShopInfo', {})
      .then(function (result) {

      })
      .catch(function (err) {

      })
  }

}
