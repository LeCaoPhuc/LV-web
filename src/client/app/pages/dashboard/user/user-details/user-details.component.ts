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
	public user: any = {
			id: '',
			gender: 'male',
			lastName: '',
			firstName: '',
			userName: '',
			address: '',
			phoneNumber: '',
			email: '',
			status: false,
			usertype: 'user',
			password: ''
	};
	private currentFile : any;;
	public pageType: string;
	public avatar : any =  '../../../../assets/images/avatar_default.png';
	public userError : any = {
		username: {
			message: '',
			pattern: /^[a-zA-Z0-9 ]{1,50}$/,
			name: 'Tài khoản'
		},
		firstname: {
			message: '',
			pattern: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]{1,50}$/,
			name: 'Họ'
		},
		lastname: {
			message: '',
			pattern: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]{1,50}$/,
			name: 'Tên'
		},
		address: {
			message: '',
		},
		email: {
			message: '',
			pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			name: 'Email'
		},
		phonenumber : {
			message: '',
			pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
			name: 'Số điện thoại'
		},
		password : {
			message: '',
			pattern:  /^[a-zA-Z0-9 ]{8,12}$/,
			name: 'Số điện thoại'
		}
	}
	constructor(
		private sharedService: SharedService,
		private location: Location,
		private router: Router,
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
					usertype: 'user',
				}
				// self.setChangeSelectBox();
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
										gender: result.data.get('gender') ? result.data.get('gender') : 'nodata',
										lastName: result.data.get('last_name'),
										firstName: result.data.get('first_name'),
										userName: result.data.get('username'),
										address: result.data.get('address'),
										phoneNumber: result.data.get('phone_number'),
										email: result.data.get('email'),
										status: result.data.get('status'),
										usertype: result.data.get('user_type') ? result.data.get('user_type') : 'user',
										avatar: result.data.get('avatar') ? result.data.get('avatar').url() : '../../../../assets/images/avatar_default.png'
									}
									self.avatar = result.data.get('avatar') ? result.data.get('avatar').url() : '../../../../assets/images/avatar_default.png';
								}
							}
						})
						.catch(function (err) {
							console.log(err);
						})
				}
				else {
					self.avatar = self.avatar ? self.user.avatar : '../../../../assets/images/avatar_default.png'
				}
			}
		})
	}
	changePhoto(file: any) {
		var reader = new FileReader();
		if(file.files && file.files[0]){
			this.currentFile = file.files[0];
			var reader = new FileReader();
			reader.onload = (event:any) => {
				this.avatar = event.target.result;
			}
			reader.readAsDataURL(file.files[0]);
			// file.value = null;
		}
	}
	checkBoxChange(checkbox: any) {
		console.log(checkbox);
		if(this.user.status == 'block') {
			this.user.status = null;
		}
		else {
			this.user.status = 'block';
		}
	}
	goBack() {
		this.location.back();
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
	onSaveButtonTap(userDetail: any) {
		// console.log('onSaveButtonTap');
		var self  = this;
		if(userDetail.valid) { 
			console.log('onSaveButtonTap');
			console.log('a');
			var image : any;
			if(this.avatar && this.avatar.substr(0,4) == 'data') {
				if(this.user.gender == 'nodata') {
					this.user.gender = null;
				}
				if(this.user.usertype == 'user') {
					this.user.usertype = null;
				}
				this.parseService.parseFile(this.currentFile.name.substr(this.currentFile.name.indexOf('.')+1),this.currentFile,true)
				.then(function(image: any) {
					self.user.avatar = image;
					self.parseService.cloud('saveUserInfo',self.user) 
					.then(function(result){
						alert('Lưu thành công');
						self.router.navigate(['dashboard/user']);
					})
					.catch(function(err){
						console.log(err);
						if(err.message.error.code==602 && self.pageType == 'edit') {
							alert('Email đã được sử dụng');
						}
						else if(err.message.error.code==602 && self.pageType == 'add') {
							if(err.message.message == 'email') {
								alert('Email đã được sử dụng');
							}
							else {
								alert('Tài khoản đã được sử dụng');
							}
						}
						else  {
							alert('Có lỗi trong quá trình save');
						}
					})
				})
				.catch(function(err : any){
					console.log(err);
					alert('Có lỗi khi lưu hình ảnh');
				})
			}
			else {
				this.user.avatar = null;
				if(this.user.gender == 'nodata') {
					this.user.gender = null;
				}
				if(this.user.usertype == 'user') {
					this.user.usertype = null;
				}
				self.user.avatar = null;
				self.parseService.cloud('saveUserInfo',self.user) 
				.then(function(result){
					alert('Lưu thành công');
					self.router.navigate(['dashboard/user']);
				})
				.catch(function(err){
					console.log(err);
					if(err.message.error.code==602 && self.pageType == 'edit') {
						alert('Email đã được sử dụng');
					}
					else if(err.message.error.code==602 && self.pageType == 'add') {
						if(err.message.message == 'email') {
							alert('Email đã được sử dụng');
						}
						else {
							alert('Tài khoản đã được sử dụng');
						}
					}
					else  {
						alert('Có lỗi trong quá trình save');
					}
				})
			}
		}
		else {
			for(var i in userDetail.controls) {
				if(userDetail.controls[i] && userDetail.controls[i].errors) {
					$('[name='+i+']').addClass('invalid');
					if(userDetail.controls[i].errors.required) {
						this.userError[i].message = this.userError[i].name + ' không được để trống';
					}
					else if(userDetail.controls[i].errors.pattern) {
						this.userError[i].message = this.userError[i].name + '  không đúng định dạng';
					}
				}
			}
			console.log('onSaveButtonTap');
		}
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
			this.userError.firstname.message = 'Họ không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.firstname.message = 'Họ không đúng định dạng';
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
			this.userError.lastname.message = 'Tên không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.lastname.message = 'Tên không đúng định dạng';
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
			this.userError.email.message = 'Email không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.email.message = 'Email không đúng định dạng';
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
			this.userError.phonenumber.message = 'Số điện thoại không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.phonenumber.message = 'Số điện thoại không đúng định dạng';
			}
			else {
				this.userError.phonenumber.message = '';
			}
		}

		this.changeDetectorRef.detectChanges();
	}
	addressErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.userError.address.message = 'Địa chỉ không được để trống';
		}
		else {
			this.userError.address.message = '';
		}

		this.changeDetectorRef.detectChanges();
	}
	passwordErrorMessage(event: any) {
		if (event && event.required) {
			this.userError.password.message = 'Mật khẩu không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.userError.password.message = 'Mật khẩu không đúng định dạng';
			}
			else {
				this.userError.password.message = '';
			}
		}
	}
}
