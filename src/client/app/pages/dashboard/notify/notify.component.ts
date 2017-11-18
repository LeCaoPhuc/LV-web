import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, GetStringService,SharedService } from '../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
/**
 * This class represents the lazy loaded OrderComponent.
 */
@Component({
	moduleId: module.id,
	selector: 'sd-notify',
	templateUrl: 'notify.component.html',
	styleUrls: ['notify.component.css'],
})
export class NotifyComponent implements OnInit {
    public notifyData: any = {
       	username: {
			message: '',
			pattern: /^[a-zA-Z0-9 ]{1,50}$/,
			name: 'Tài khoản',
        },
        title: {
			message: '',
			pattern: /^[a-zA-Z0-9 ]{1,100}$/,
			name: 'Tiêu đề',
        },
        content: {
			message: '',
			pattern: /^[a-zA-Z0-9 ]{1,255}$/,
			name: 'Nội dung',
		},
	}
	public notifyInfo : any = {
		username: '',
		title: '',
		content: ''
	}
	constructor(
		private sharedService: SharedService,
		private router: Router,
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private parseService: ParseSDKService,
		private changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
	
	}
	goBack() {
		this.location.back();
	}
	titleErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.notifyData.title.message = this.notifyData.title.name  + ' không được để trống';
		}
		this.changeDetectorRef.detectChanges();
	}
	usernameErrorMessage(event: any) {
		console.log(event);
		if (event && event.required) {
			this.notifyData.username.message = this.notifyData.username.name  + ' không được để trống';
		}
		else {
			if (event && event.pattern) {
				this.notifyData.username.message =  this.notifyData.username.name +' không đúng định dạng';
			}
			else {
				this.notifyData.username.message = '';
			}
		}
		this.changeDetectorRef.detectChanges();
	}
	contentErrorMessage(event : any) {
		console.log(event);
		if (event && event.required) {
			this.notifyData.content.message = this.notifyData.content.name  + ' không được để trống';
		}
		this.changeDetectorRef.detectChanges();
	}
	onClickSendNotify(notifyForm: any) {
		console.log('onClickSendNotify');
		var self =this;
		if(notifyForm.valid) { 
			this.parseService.cloud('sendNotify',this.notifyInfo)
			.then(function(res: any) {
				if(res && res.success) {
					if(res.data) {
						alert('Gửi thông báo thành công đến '+res.data.get('receiver').get('first_name')+ ' ' + res.data.get('receiver').get('last_name') );
					}
				}
				else {
					alert('Có lỗi khi gửi thông báo!')
				}
			})
			.catch(function(err: any){
				if(err.message.error.code == 601) {
					alert('Tài khoản không tồn tại');
				}
				else {
					alert('Có lỗi khi gửi thông báo !Vui lòng thử lại');
				}
				console.log(err);
			})
		}
		else {
			for(var i in notifyForm.controls) {
				if(notifyForm.controls[i] && notifyForm.controls[i].errors) {
					$('[name='+i+']').addClass('invalid');
					if(notifyForm.controls[i].errors.required) {
						this.notifyData[i].message = this.notifyData[i].name + ' không được để trống';
					}
					else if(notifyForm.controls[i].errors.pattern) {
						this.notifyData[i].message = this.notifyData[i].name + '  không đúng định dạng';
					}
				}
			}
		}
	}
}
