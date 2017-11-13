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
	private product: any;

	constructor(
		private sharedService: SharedService,
		private location: Location,
		private activatedRoute: ActivatedRoute,
	) {
		// this.product = this.sharedService.getShareData('currentProduct');

	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params['id'] == 'new') {
				this.product = {
					id: '',
					name: '',
					category: '',
					image: '',
					description: '',
					price: '',
					stockStatus: 'instock',
				}
			}
			else {
				this.product = this.sharedService.getShareData('currentProduct');
			}
		})

		if (this.product.stockStatuc != 'instock') {
			$('#stock-status').prop('selectedIndex', 1);
		}

		// init drop down
		$('#category').material_select();
		$('#stock-status').material_select();
		// $('#color').material_select();
		// $('#material').material_select();

		//set value and enable autoresize for TextView description
		$('#description').val(this.product.description);
		$('#description').trigger('autoresize');
	}

	goBack() {
		this.location.back();
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
