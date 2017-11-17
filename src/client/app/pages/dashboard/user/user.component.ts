import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService, Pagination } from '../../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/**
 * This class represents the lazy loaded UserComponent.
 */
@Component({
	moduleId: module.id,
	selector: 'sd-user',
	templateUrl: 'user.component.html',
	styleUrls: ['user.component.css'],
})
export class UserComponent implements OnInit {
	public userList: Array<any>;
	public pagination: any;
	constructor(
		private router: Router,
		private sharedService: SharedService,
		private parseService: ParseSDKService,
	) {
		var self = this;
		this.pagination = new Pagination();
		this.pagination.page = 1;
		this.pagination.perPage = 2;
		this.pagination.enableLoading = true;
		this.pagination.enableMaxPageMode = true;
		this.pagination.maxPageInPagination = 5;
		this.pagination.getNumOfPage = function(){
			return self.parseService.cloud('countObject',{
				className: 'User'
			})
		}		
 		this.pagination.getData = function(page: number, perPage: number) {
			return self.parseService.cloud('getUserList',{
				page: page,
				limit: perPage
			})
		}
	}

	ngOnInit() {
		var self =this;
		this.getUserList(self.pagination.page);
		this.getPageNumber();
	}
	getPageNumber() {
		var self = this;
		this.pagination.executeGetNumOfPage();
	}

	getUserList(page: any) {
		var self =this;
		this.pagination.getPage(page)
		.then(function(res: any){	
			console.log(res);
			if(res && res.success) {
				self.userList = [];
				if(res.data) {
					for(var i = 0 ; i < res.data.length; i++) {
						self.userList.push({
							id: res.data[i].id,
							lastName: res.data[i].get('last_name'),
							firstName:  res.data[i].get('first_name'),
							userName:  res.data[i].get('username'),
							gender: res.data[i].get('gender') ,
							phoneNumber : res.data[i].get('phone_number') ? res.data[i].get('phone_number') : 'không có số điện thoại',
							email: res.data[i].get('email') ? res.data[i].get('email') : 'không có email',
							address: res.data[i].get('address') ? res.data[i].get('address') : 'không có địa chỉ',
							status: res.data[i].get('status')=='block' ? false : true,
							avatar : res.data[i].get('avatar') ? res.data[i].get('avatar').url() : '../../../../assets/images/avatar_default.png'
						})
					}
				}
			}
		})
		.catch(function(err: any){
			console.log("error ")
		})
	}
	showUserDetails(user: any) {
		this.sharedService.setShareData('currentUser', user);
		this.router.navigate(['dashboard/user/'+user.id]);
	}

	onAddButtonTap(args: any) {
		this.router.navigate(['dashboard/user/new']);
	}
}
