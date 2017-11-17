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
	public listPage : Array<any>;
	public pagination: any;
	constructor(
		private router: Router,
		private sharedService: SharedService,
		private parseService: ParseSDKService,
	) {
	}

	ngOnInit() {
		var self = this;
		this.pagination = new Pagination();
		this.pagination.page = 1;
		this.pagination.perPage = 5;
		this.pagination.getNumOfPage = function(){
			return self.parseService.cloud('countObject',{
				className: 'User'
			})
		}		
 		this.pagination.getData = function() {
			return self.parseService.cloud('getUserList',{
				page: self.pagination.page,
				limit: self.pagination.perPage
			})
		}
		this.pagination.executeGetNumOfPage(function(){
			self.listPage = [];
			for(var i = 0 ; i < self.pagination.numOfPage; i++) {
				self.listPage.push(i+1);
			}
			self.pagination.getPage(self.pagination.page)
			.then(function(res: any){	
				console.log(res);
				if(res && res.success) {
					self.userList = [];
					if(res.data) {
						for(var i = 0 ; i < res.data.length; i++) {
							self.userList.push({
								lastName: res.data[i].get('last_name'),
								firstName:  res.data[i].get('first_name'),
								userName:  res.data[i].get('username'),
								gender: res.data[i].gender ,
								phoneNumber : res.data[i].get('phone_number') ? res.data[i].get('phone_number') : 'không có số điện thoại',
								email: res.data[i].get('email') ? res.data[i].get('email') : 'không có email',
								address: res.data[i].get('address') ? res.data[i].get('address') : 'không có địa chỉ',
								status: res.data[i].get('status')=='block' ? false : true
							})
						}
					}
				}
			})
			.catch(function(err: any){
				console.log("error ")
			})
		})
	}

	onClickPaginationPage(page : any) {
		var self = this;
		self.pagination.getPage(page)
			.then(function(res: any){	
				console.log(res);
				if(res && res.success) {
					self.userList = [];
					if(res.data) {
						for(var i = 0 ; i < res.data.length; i++) {
							self.userList.push({
								lastName: res.data[i].get('last_name'),
								firstName:  res.data[i].get('first_name'),
								userName:  res.data[i].get('username'),
								gender: res.data[i].gender ,
								phoneNumber : res.data[i].get('phone_number') ? res.data[i].get('phone_number') : 'không có số điện thoại',
								email: res.data[i].get('email') ? res.data[i].get('email') : 'không có email',
								address: res.data[i].get('address') ? res.data[i].get('address') : 'không có địa chỉ',
								status: res.data[i].get('status')=='block' ? false : true
							})
						}
					}
				}
			})
			.catch(function(err: any){
				console.log("error ")
			})
	}

	showUserDetails(args: any) {
		// var user = this.users[args.currentTarget.children[0].innerText - 1];
		// var userId = user.id;
		// this.sharedService.setShareData('currentUser', user);
		// this.router.navigate(['dashboard/user/' + userId]);
	}

	onAddButtonTap(args: any) {
		this.router.navigate(['dashboard/user/new']);
	}
}
