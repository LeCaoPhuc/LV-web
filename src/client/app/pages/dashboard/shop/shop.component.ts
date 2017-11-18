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
    shopname: {
      message: '',
      pattern: /^[a-zA-Z0-9 ]{1,50}$/,
      name: 'Tài khoản',
    },
    latitude: {
      message: '',
      pattern: /^(\+|-)?(?:90(?:(?:\.0{1,7})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,7})?))$/,
      name: '',
    },
    longitude: {
      message: '',
      pattern: /^(\+|-)?(?:180(?:(?:\.0{1,7})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,7})?))$/,
      name: 'Nội dung',
    },
    phonenumber: {
      message: '',
      pattern: /^[0-9]{10,11}$/,
      name: 'Số điện thoại',
    },
    description: {
      message: '',
      pattern: /^[a-zA-Z0-9 ]{1,255}$/,
      name: 'Nội dung',
    },
    timeopen: {
      message: '',
      name: 'Giờ mở cửa'
    },
    timeclose: {
      message: '',
      name: 'Giờ đóng cửa'
    },
    address: {
      message: '',
      name: 'Địa chỉ'
    }
  }
  public shopInfo: any = {
    id: '',
    shopname: '',
    latitude: '',
    longitude: '',
    phonenumber: '',
    description: '',
    timeopen: '',
    timeclose: '',
    address: ''
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
    var self = this;
    this.parseService.cloud('getShopInfo', {})
      .then(function (result: any) {
        if (result && result.success) {
          if (result.data) {
            self.shopInfo = {
              id: result.data.id,
              shopname: result.data.get('shop_name'),
              latitude: result.data.get('latitude'),
              longitude: result.data.get('longitude'),
              phonenumber: result.data.get('shop_phone_number'),
              description: result.data.get('shop_description'),
              timeopen: result.data.get('time_open') ? result.data.get('time_open').substring(0,result.data.get('time_open').indexOf('-')) : '00:00 AM',
              timeclose: result.data.get('time_open') ? result.data.get('time_open').substring(result.data.get('time_open').indexOf('-')+1) : '00:00 AM',
              address: result.data.get('shop_address')
            }
          }
        }
      })
      .catch(function (err) {
        console.log('error when get shopInfo', err);
      })
  }
  onClickSaveShopInfo(shopForm: any) {
    var self =this;
    var timeopen =  this.shopInfo.timeopen + ' - ' + this.shopInfo.timeclose;
    if (shopForm.valid) {
      var data = {
        id: this.shopInfo.id,
        shopname: this.shopInfo.shopname,
        latitude: this.shopInfo.latitude,
        longitude: this.shopInfo.longitude,
        phonenumber: this.shopInfo.phonenumber,
        description: this.shopInfo.description,
        timeopen: timeopen,
        address: this.shopInfo.address
      }
      this.parseService.cloud('saveShop', data)
      .then(function(result: any){
        if(result && result.success) {
           alert('Lưu thành công');
        }
        else {
           alert('Lưu thất bại');
        }
      })
      .catch(function(err){
        console.log(err);
        alert('Lưu thất bại. Vui lòng thử lại!');
      })
    }
    else {
      for (var i in shopForm.controls) {
        if (shopForm.controls[i] && shopForm.controls[i].errors) {
          $('[name=' + i + ']').addClass('invalid');
          if (shopForm.controls[i].errors.required) {
            this.shopData[i].message = this.shopData[i].name + ' không được để trống';
          }
          else if (shopForm.controls[i].errors.pattern) {
            this.shopData[i].message = this.shopData[i].name + '  không đúng định dạng';
          }
        }
      }
    }
  }
  phonenumberErrorMessage(event: any) {
    console.log('eeee');
    if (event && event.required) {
      this.shopData.phonenumber.message = this.shopData.phonenumber.name + ' không được để trống';
    }
    else {
      if (event && event.pattern) {
        this.shopData.phonenumber.message = this.shopData.phonenumber.name + ' không đúng định dạng';
      }
      else {
        this.shopData.phonenumber.message = '';
      }
    }
    this.changeDetectorRef.detectChanges();
  }
  timeopenErrorMessage(event: any) {
    console.log(event);
    if (event && event.required) {
      this.shopData.timeopen.message = this.shopData.timeopen.name + ' không được để trống';
    }
    this.changeDetectorRef.detectChanges();
  }
  timecloseErrorMessage(event: any) {
    console.log(event);
    if (event && event.required) {
      this.shopData.timeclose.message = this.shopData.timeclose.name + ' không được để trống';
    }
    this.changeDetectorRef.detectChanges();
  }
  longitudeErrorMessage(event : any) {
    console.log(event);
    if (event && event.required) {
      this.shopData.longitude.message = this.shopData.longitude.name + ' không được để trống';
    }
    else {
      if (event && event.pattern) {
        this.shopData.longitude.message = this.shopData.longitude.name + ' phải từ -180 đến 180 (tối đa 7 chữ số thập phân)';
      }
      else {
        this.shopData.longitude.message = '';
      }
    }
    this.changeDetectorRef.detectChanges();
  }
  latitudeErrorMessage(event : any) {
    console.log(event);
    if (event && event.required) {
      this.shopData.latitude.message = this.shopData.latitude.name + ' không được để trống';
    }
    else {
      if (event && event.pattern) {
        this.shopData.latitude.message = this.shopData.latitude.name + 'phải từ -90 đến 90 (tối đa 7 chữ số thập phân)';
      }
      else {
        this.shopData.latitude.message = '';
      }
    }
    this.changeDetectorRef.detectChanges();
  }
}
