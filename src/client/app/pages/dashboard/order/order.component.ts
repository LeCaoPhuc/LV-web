import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, GetStringService } from '../../../shared/index';

/**
 * This class represents the lazy loaded OrderComponent.
 */
@Component({
	moduleId: module.id,
	selector: 'sd-order',
	templateUrl: 'order.component.html',
	styleUrls: ['order.component.css'],
})
export class OrderComponent implements OnInit {
	private listOrder: Array<any>;
	constructor(
		public HttpRequest: HttpRequestService,
		public parse: ParseSDKService,
	) { }

	ngOnInit() {
		this.listOrder = [
			{
				orderNumber: '124',
				buyerName: 'Khách hàng 1',
				deliveryAddress: '123 đường abc',
				deliveryDate: '',
				totalPrice: '599.000',
				deliveryStatus: 'pending',
				status: '',
			}
		]
	}

}
