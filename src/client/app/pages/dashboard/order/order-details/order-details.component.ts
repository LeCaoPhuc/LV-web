import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
declare var $:any ;
/**
 * This class represents the lazy loaded OrderDetailsComponent.
 */
@Component({
	moduleId: module.id,
	selector: 'sd-order-details',
	templateUrl: 'order-details.component.html',
	styleUrls: ['order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
	private order: any;
	private pageType: string;
	constructor(
		private sharedService: SharedService,
		private location: Location,
		private activatedRoute: ActivatedRoute,
	) {
		// this.order = this.sharedService.getShareData('currentOrder');
		
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params['id'] == 'new') {
				this.pageType = 'add';
				this.order = {
					
				}
			}
			else {
				this.pageType = 'edit';
				this.order = this.sharedService.getShareData('currentOrder');
			}
		})
		// if (this.order.gender == 'female') {
		// 	$('#gender').prop('selectedIndex', 1);
		// }
		// $('#gender').material_select();
	}

	goBack() {
		this.location.back();
	}

	onDeleteOrderButtonTap() {
		alert('onDeleteOrderButtonTap');
	}

	onSaveButtonTap() {
		alert('onSaveButtonTap');
	}

}
