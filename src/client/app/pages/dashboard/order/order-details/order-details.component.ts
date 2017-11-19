import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService, ToolsService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { OrderDetailsEditComponent } from '../order-details-edit/index';
declare var $: any;
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
		deliverty_status: '',
		delivery_address: new Date(),
		createdAt: '',
		buyer: '',
		receiver: {},
	};
	public colorList: Array<any>;
	public materialList: Array<any>;
	public promotionList: Array<any>;
	public productDetail : any = {
		id: '',
		sku: '',
		price: '',
		quantity: '',
		material : '',
		color : '',
		promotion : '',
		image : ''
	};
	public orderParseObj: any;
	public orderDetailList: any;
	public deliveryDateMessage: string = '';
	private currentQuantityProduct : any;
	@ViewChild(OrderDetailsEditComponent) orderEditCmp: OrderDetailsEditComponent;
	constructor(
		private sharedService: SharedService,
		private parse: ParseSDKService,
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		private tools: ToolsService
	) {
		// this.order = this.sharedService.getShareData('currentOrder');

	}

	ngOnInit() {
		var self = this;
		this.activatedRoute.params.subscribe((params: Params) => {
			this.order = this.sharedService.getShareData('currentOrder');
			if (this.order) {
				this.orderParseObj = this.order;
				this.order = {
					id: this.order.id,
					order_number: this.order.get('order_number'),
					total_price: self.tools.numberToFormatedString(this.order.get('total_price')),
					delivery_date: this.order.get('delivery_date') ? this.order.get('delivery_date') : new Date(),
					delivery_status: this.order.get('delivery_status'),
					delivery_address: this.order.get('delivery_address'),
					createdAt: this.order.get('createdAt'),
					buyer: this.order.get('buyer').get('first_name') + ' ' + this.order.get('buyer').get('last_name'),
				}
				self.orderEditCmp.getOrderDetailByOrder(self.orderParseObj);
				// this.getOrderDetail();
			} else {
				this.parse.cloud('getOrderWithId', {
					id: params['id']
				}).then(function (res: any) {
					console.log(res);
					if (res && res.success) {
						if (res.data) {
							self.order = {
								id: res.data.id,
								order_number: res.data.get('order_number'),
								total_price: self.tools.numberToFormatedString(res.data.get('total_price')),
								delivery_date: res.data.get('delivery_date') ? res.data.get('delivery_date') : new Date(),
								delivery_status: res.data.get('delivery_status'),
								delivery_address: res.data.get('delivery_address'),
								createdAt: res.data.get('createdAt'),
								buyer: res.data.get('buyer').get('first_name') + ' ' + res.data.get('buyer').get('last_name'),
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
		this.getListDataOfproductDetail();
	}

	getListDataOfproductDetail() {
		var self =this;
		if (this.sharedService.getShareData('materialList')) {
			this.materialList = this.sharedService.getShareData('materialList');
			if (this.materialList[0].id) this.productDetail.material = this.materialList[0].id;
		} else {
			this.parse.cloud('getMaterialList', {
				limit: 10000,
				page: 1
			}).then(function (res: any) {
				self.materialList = res.data;
				if (self.materialList[0].id) self.productDetail.material = self.materialList[0].id;
				self.sharedService.setShareData('materialList', res.data);
			})
		}

		if (this.sharedService.getShareData('colorList')) {
			this.colorList = this.sharedService.getShareData('colorList');
			if (this.colorList[0].id) this.productDetail.color = this.colorList[0].id;
		} else {
			this.parse.cloud('getColorList', {
				limit: 10000,
				page: 1
			}).then(function (res: any) {
				self.colorList = res.data;
				if (self.colorList[0].id) self.productDetail.color = self.colorList[0].id;
				self.sharedService.setShareData('colorList', res.data);
			})
		}

		this.parse.cloud('getPromotionList', {}).then(function (res: any) {
			self.promotionList = res.data;
			if (self.promotionList[0].id) self.productDetail.promotion = self.promotionList[0].id;
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
		if (delivery_date.diff(date, 'day') < 0 || event == '') {
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

	onClickDelete() {
		var self = this;
		var r = confirm("Bạn có muốn xóa đơn hàng này !");
		if (r == true) {
			this.parse.cloud('deleteOrder', {
				id: this.order.id
			})
				.then(function (result) {
					alert('Xóa thành công!');
					self.router.navigate(['dashboard/order']);
				})
				.catch(function (err) {
					alert('Xóa thất bại!');
					console.log(err);
				})
		} else {

		}
	}
	onClickSave(orderDetailForm: any) {
		if (orderDetailForm.valid && this.order.delivery_date) {
			var date = new Date();
			var delivery_date = new moment((new Date(this.order.delivery_date)));
			if (delivery_date.diff(date, 'day') < 0) {
				console.log('error');
				this.deliveryDateMessage = 'Ngày giao không được để trống và lớn hơn ngày hiện tại';
			}
			else {
				this.parse.cloud('saveOrder', {
					id: this.order.id,
					delivery_date: this.order.delivery_date
				})
					.then(function (res) {
						alert('Lưu thành công');
					})
					.catch(function (err) {
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
	changeDeliveryStatus(addProductDetailModal: any) {
		var self = this;
		this.parse.cloud('changeDeliveryStatus',{
			id: this.order.id
		})
		.then(function(result: any){
			if(result && result.success) {
				if(self.order.delivery_status == 'order') {
					self.order.delivery_status = 'bill';
				}
				else {
					if(self.order.delivery_status == 'bill') {
						self.order.delivery_status = 'order';
					}
				}
				alert('Chuyển đổi trạng thái thành công');
			}
			else {
				console.log(result);
				var quantityProduct = result.data.quantity_product ? result.data.quantity_product: 0;
				var quantityBuy = result.data.quantity_buy ? result.data.quantity_buy : 2;
				var r = confirm("Sản phẩm có sku là [" + result.data.product_detail.get('sku') +"] có số lượng hiện nay là "+ quantityProduct + ", số lượng mua là "+ quantityBuy + ". Bạn có muốn nhập thêm số lượng!");
				if (r == true) {
					self.currentQuantityProduct = quantityProduct;
					self.parse.cloud('getProductDetailWithProductDetailId',{
						id: result.data.product_detail.id
					})
					.then(function(res: any){
						if(res && res.success) {
							if(res.data) {
								self.productDetail  = {
									id: res.data.id,
									sku: res.data.get('sku'),
									price: self.tools.numberToFormatedString(res.data.get('price')),
									quantity: res.data.get('quantity'),
									material : res.data.get('material').id,
									color : res.data.get('color').id,
									promotion :  res.data.get('promotion') ? res.data.get('promotion').id : '',
									image: res.data.get('image') ? res.data.get('image').url() : null
								};
							}
						}
						else {
							alert('Lấy thông tin sản phẩm thất bại')
						}
					})
					.catch(function(err){
						console.log(err);
						alert('Lấy thông tin sản phẩm thất bại')
					})
					addProductDetailModal.open();
				}
				else {

				}
			}
		})
		.catch(function(err){
			console.log(err);
			alert('Chuyển đổi trạng thái thất bại');
		})
	}
	dateToPickerDate(date?: any) {
		if (!date) {
			date = new Date();
		}
		var dt = new moment(date);
		return dt.format('ddd MMM DD YYYY');
	}
	closeProductDetail(addProductDetailModal: any) {
		addProductDetailModal.close();
	}
	saveProductDetail(addProductDetailModal: any) {
		if(this.productDetail.quantity > 0 || this.productDetail.quantity > this.currentQuantityProduct) {
			this.parse.cloud('saveQuantityProductDetail',{
				id: this.productDetail.id,
				quantity: this.productDetail.quantity
			})
			.then(function(result: any){
				if(result && result.success) {
					if(result.data) {
						alert('Lưu sản phẩm thành công. Hãy duyệt lại đơn hàng!');
						addProductDetailModal.close();
					}
				}
			})
			.catch(function(err){
				alert('Có lỗi khi lưu dữ liệu');
				console.log(err);
			})
		}
		else {
			alert('Số lượng mới phải lớn hơn số lượng tồn trước đó');
		}
	}
}
