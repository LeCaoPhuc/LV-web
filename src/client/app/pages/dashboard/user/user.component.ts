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
	private userList: Array<any>;
	private pagination: any;
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
		this.pagination.perPage = 9;
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
		this.pagination.getPage(this.pagination.page)
		.then(function(res: any){	
			console.log(res);
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
