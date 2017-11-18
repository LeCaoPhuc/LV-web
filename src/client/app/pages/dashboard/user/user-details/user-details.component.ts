import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
/**
 * This class represents the lazy loaded UserDetailsComponent.
 */
@Component({
	moduleId: module.id,
	selector: 'sd-user-details',
	templateUrl: 'user-details.component.html',
	styleUrls: ['user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
	public user: any = {};
	public pageType: string;
	private userTemp = {
		id: '',
		gender: 'male',
		lastName: '',
		firstName: '',
		userName: '',
		address: '',
		phoneNumber: '',
		email: '',
		status: false,
		usertype: '',
	}
	public userError = {
		username: {
			message: '',
			pattern: /^[a-zA-Z0-9]{1,50}$/
		},
		firstname: {
			message: '',
			pattern: /^[a-zA-Z]{1,50}$/
		},
		lastname: {
			message: '',
			pattern: /^[a-zA-Z]{1,50}$/
		},
		address: {
			message: '',
			pattern: /^[a-zA-Z0-9]{1,255}$/
		},
		email: {
			message: '',
			pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		},
		phonenumber : {
			message: '',
			pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		}
	}
	constructor(
		private sharedService: SharedService,
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private parseService: ParseSDKService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		// this.user = this.sharedService.getShareData('currentUser');

	}

	ngOnInit() {
		var self = this;
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params['id'] == 'new') {
				this.pageType = 'add';
				this.user = {
					id: '',
					gender: 'male',
					lastName: '',
					firstName: '',
					userName: '',
					address: '',
					phoneNumber: '',
					email: '',
					status: false,
					usertype: '',
				}
				self.setChangeSelectBox();
			}
			else {
				self.pageType = 'edit';
				self.user = self.sharedService.getShareData('currentUser');
				if (!self.user) {
					self.parseService.cloud('getUserInfo', {
						userId: params['id']
					})
						.then(function (result: any) {
							if (result && result.success) {
								self.user = {};
								if (result.data) {
									self.user = {
										id: result.data.id,
										gender: result.data.get('gender'),
										lastName: result.data.get('last_name'),
										firstName: result.data.get('first_name'),
										userName: result.data.get('username'),
										address: result.data.get('address'),
										phoneNumber: result.data.get('phone_number'),
										email: result.data.get('email'),
										status: result.data.get('status') == 'block' ? true : false,
										usertype: result.data.get('user_type'),
										avatar: result.data.get('avatar') ? result.data.get('avatar').url() : '../../../../assets/images/avatar_default.png'
									}
								}
							}
							self.setChangeSelectBox();
						})
						.catch(function (err) {
							console.log(err);
						})
				}
				else {
					self.setChangeSelectBox();
				}
			}
		})
	}
	setChangeSelectBox() {
		if (this.user.gender == 'female') {
			$('#gender').prop('selectedIndex', 1);
		}
		// $('#gender').material_select();
		if (this.user.usertype != 'admin') {
			$('#usertype').prop('selectedIndex', 1);
		}
		// $('#usertype').material_select();
	}
	goBack() {
		this.location.back();
	}
	fetchUser(user: any) {

	}
	onDeleteUserButtonTap() {
		var self = this;
		this.parseService.cloud('deleteObject', {
			className: 'User',
			id: this.user.id
		})
			.then(function (result) {
				alert('Xóa thành công!');
				self.location.back();
			})
			.catch(function (err) {
				console.log(err);
			})
	}

	onSaveButtonTap() {
	}
	usernameErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.userError.username.message = 'Tài khoản không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.username.message = 'Tài khoản không đúng định dạng';
			}
			else {
				this.userError.username.message = '';
			}
		}

		this.changeDetectorRef.detectChanges();
	}
	firstnameErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.userError.firstname.message = 'Tài khoản không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.firstname.message = 'Tài khoản không đúng định dạng';
			}
			else {
				this.userError.firstname.message = '';
			}
		}

		this.changeDetectorRef.detectChanges();
	}
	lastnameErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.userError.lastname.message = 'Tài khoản không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.lastname.message = 'Tài khoản không đúng định dạng';
			}
			else {
				this.userError.lastname.message = '';
			}
		}

		this.changeDetectorRef.detectChanges();
	}
	emailErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.userError.email.message = 'Tài khoản không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.email.message = 'Tài khoản không đúng định dạng';
			}
			else {
				this.userError.email.message = '';
			}
		}

		this.changeDetectorRef.detectChanges();
	}
	phonenumberErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.userError.phonenumber.message = 'Tài khoản không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.username.message = 'Tài khoản không đúng định dạng';
			}
			else {
				this.userError.username.message = '';
			}
		}

		this.changeDetectorRef.detectChanges();
	}
	addressErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.userError.username.message = 'Tài khoản không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.username.message = 'Tài khoản không đúng định dạng';
			}
			else {
				this.userError.username.message = '';
			}
		}

		this.changeDetectorRef.detectChanges();
	}
}
