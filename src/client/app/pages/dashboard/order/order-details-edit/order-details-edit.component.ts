import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService, ToolsService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
declare var moment: any;
/**
 * This class represents the lazy loaded OrderDetailsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-order-details-edit',
  templateUrl: 'order-details-edit.component.html',
  styleUrls: ['order-details-edit.component.css'],
})
export class OrderDetailsEditComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private parse: ParseSDKService,
    private tools: ToolsService
  ) {
    // this.order = this.sharedService.getShareData('currentOrder');

  }

  ngOnInit() {

  }

  getOrderDetailByOrder(order: any){
    console.log(order);
  }
}
