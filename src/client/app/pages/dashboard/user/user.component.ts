import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../../shared/index';
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
	private users: Array<any>;
	private test: string;
	constructor(
		private router: Router,
		private sharedService: SharedService,
	) {
		// this.test = 'sjkhfsjfhsjkfhsjkfhsj'
		var array = [{
			id: 'dx2nqLmeh1',
			gender: 'male',
			lastName: 'Băng',
			firstName: 'Thiên',
			userName: 'bangthien',
			address: '123 đường A, Phường B, Quận C, Thành Phố M',
			phoneNumber: '01665990099',
			email: 'bangthien@gmail.com',
			block: false
		},
		{
			id: 'dx2nqLm23d',
			gender: 'female',
			lastName: 'Nguyên',
			firstName: 'Ngọc',
			userName: 'nguyenngoc',
			address: '123 đường A, Phường B, Quận C, Thành Phố M',
			phoneNumber: '01665990099',
			email: 'nguyenngoc@gmail.com',
			block: true
		}]
		this.users = [
			...array,
			...array,
			...array,
			...array,
			...array,
			...array,
			...array,
			...array,
			...array,
		]
		// this.users = array;
	}

	ngOnInit() {

	}


	showUserDetails(args: any) {
		var user = this.users[args.currentTarget.children[0].innerText - 1];
		var userId = user.id;
		this.sharedService.setShareData('currentUser', user);
		this.router.navigate(['dashboard/user/' + userId]);
	}

	onAddButtonTap(args: any) {
		this.router.navigate(['dashboard/user/new']);
	}
}
