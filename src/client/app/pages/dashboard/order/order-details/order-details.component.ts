import { Component, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService,ToolsService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { OrderDetailsEditComponent } from '../order-details-edit/index';
declare var $:any ;
declare var moment: any;
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
	public order: any = {
		id: '',
		order_number: '',
		total_price: '',
		delivery_date: {},
		deliverty_status : '',
		delivery_address: new Date(),
		createdAt: '',
		buyer: '',
		receiver: {},
	};
	public orderParseObj: any;
	public orderDetailList : any;
  public deliveryDateMessage : string = '';
  @ViewChild(OrderDetailsEditComponent) orderEditCmp: OrderDetailsEditComponent;
	constructor(
		   private sharedService: SharedService,
			private parse: ParseSDKService,
			private location : Location,
			private activatedRoute: ActivatedRoute,
			private router: Router,
			private changeDetectorRef: ChangeDetectorRef,
			private tools : ToolsService
	) {
		// this.order = this.sharedService.getShareData('currentOrder');

	}

	ngOnInit() {
		var self =this;
		this.activatedRoute.params.subscribe((params: Params) => {
			this.order = this.sharedService.getShareData('currentOrder');
			if (this.order) {
				this.orderParseObj = this.order;
				this.order = {
					id: this.order.id,
					order_number: this.order.get('order_number'),
					total_price: self.tools.numberToFormatedString(this.order.get('total_price')),
					delivery_date:this.order.get('delivery_date') ? this.order.get('deliverty_date') : new Date(),
					delivery_status : this.order.get('delivery_status'),
					delivery_address: this.order.get('delivery_address'),
					createdAt : this.order.get('createdAt'),
					buyer: this.order.get('buyer').get('first_name') + ' ' + this.order.get('buyer').get('last_name'),
        }
        self.orderEditCmp.getOrderDetailByOrder(self.orderParseObj);
				// this.getOrderDetail();
			} else {
				this.parse.cloud('getOrderWithId', {
					id: params['id']
				}).then(function (res: any) {
					console.log(res);
					if(res && res.success) {
						if(res.data) {
							self.order = {
								id: res.data.id,
								order_number: res.data.get('order_number'),
								total_price:  self.tools.numberToFormatedString(res.data.get('total_price')),
								delivery_date: res.data.get('delivery_date') ? res.data.get('delivery_date') : new Date(),
								delivery_status : res.data.get('delivery_status'),
								delivery_address: res.data.get('delivery_address'),
								createdAt : res.data.get('createdAt'),
								buyer:  res.data.get('buyer').get('first_name') + ' ' +res.data.get('buyer').get('last_name'),
							}
						}
          }
          self.orderEditCmp.getOrderDetailByOrder(res.data);
					// self.order = res.data;
					// self.orderParseObj = self.order;
					// self.order = {
					// id: self.order.id,
					// name: self.order.get('order_name'),
					// category: self.order.get('category').id,
					// image: '',
					// description: self.order.get('order_description'),
					// // price: this.order.get('price'),
					// status: self.order.get('status') || '',
					// }
					// self.getorderDetail();
				})
			}
		})
	}
	chageOrderDate(event: any) {
		// this.order.createdAt = event;
		console.log(event);
	}
	chageDeliveryDate(event: any) {
		console.log(event);
		// this.dateToPickerDate
		var date = new Date();
		var delivery_date = new moment((event ? new Date(event) : date));
		if(delivery_date.diff(date, 'day') < 0 || event == '') {
			console.log('error');
			this.deliveryDateMessage = 'Ngày giao không được để trống và lớn hơn ngày hiện tại';
		}
		else {
			this.deliveryDateMessage = '';
		}
		this.order.delivery_date = new Date(event)
		console.log(this.order.delivery_date);
	}
	goBack() {
		this.location.back();
	}

	onDeleteOrderButtonTap() {
		alert('onDeleteOrderButtonTap');
	}
	onClickSave(orderDetailForm: any) {
		if(orderDetailForm.valid && this.order.delivery_date) {
			var date = new Date();
			var delivery_date = new moment((new Date(this.order.delivery_date)));
			if(delivery_date.diff(date, 'day') < 0) {
				console.log('error');
				this.deliveryDateMessage = 'Ngày giao không được để trống và lớn hơn ngày hiện tại';
			}
			else {
				this.parse.cloud('saveOrder',{
					id: this.order.id,
					delivery_date : this.order.delivery_date
				})
				.then(function(res){
					alert('Lưu thành công');
				})
				.catch(function(err){
					alert('Lưu thất bại');
					console.log(err);
				})
			}
		}
		else {
			console.log('inalid');
			this.deliveryDateMessage = 'Ngày giao không được để trống và lớn hơn ngày hiện tại';
		}
	}

	dateToPickerDate(date?: any) {
        if (!date) {
            date = new Date();
        }
        var dt = new moment(date);
        return dt.format('ddd MMM DD YYYY');
    }

}
