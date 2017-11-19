import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService, Pagination,ToolsService } from '../../../shared/index';
import { Router } from '@angular/router';

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
	public pagination: Pagination;
	public orderType: any;
	constructor(
		private sharedService: SharedService,
		private parse: ParseSDKService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		public tools : ToolsService
	) { 
		var self = this;
		this.pagination = new Pagination();
		this.pagination.page = 1;
		this.pagination.perPage = 10;
		this.pagination.enableLoading = true;
		this.pagination.enableMaxPageMode = true;
		this.pagination.maxPageInPagination = 5;
		this.pagination.getData = function (page: number, perPage: number) {
		return self.parse.cloud('getOrderList', {
			type: self.orderType,
			isAdmin: true,
			limit: perPage,
			page: page
		})
		}
		this.pagination.getNumOfPage = function () {
			return self.parse.cloud('countOrder', {
				type: self.orderType,
			})
		}
	}

	ngOnInit() {
		this.getPageNumber();
    	this.getOrder(1);
	}
	getOrder(page: number) {
		var self = this;
		this.pagination.getPage(page).then(function (res: any) {
		self.listOrder = res.data;
		self.changeDetectorRef.detectChanges();
		}).catch(function(err){
			console.log(err);
		})
	}
	onSelectOrderType(event: any) {
		this.orderType = event;
		this.getPageNumber();
		this.getOrder(1);
	}

  	getPageNumber() {
		var self = this;
		this.pagination.executeGetNumOfPage();
	}
	showOrderDetails(order : any) {
		// var index = args.currentTarget.children[0].innerText - 1;
		this.sharedService.setShareData('currentOrder', order);
		this.router.navigate(['dashboard/order/' + order.id]);
	}
}
