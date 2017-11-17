import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, GetStringService } from '../../../shared/index';

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

  constructor(
    public HttpRequest: HttpRequestService,
    public parse: ParseSDKService,
    public getString: GetStringService
  ) { }

  ngOnInit() {
    this.parse.cloud('getShopInfo',{})
    .then(function(result){

    })
    .catch(function(err){
      
    })
    console.log(this.getString.get('TEST', ['Phong', 'Do']));
  }

}
