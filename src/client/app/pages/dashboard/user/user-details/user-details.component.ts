import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
declare var $:any ;
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
	private user: any;
	private pageType: string;
	constructor(
		private sharedService: SharedService,
		private location: Location,
		private activatedRoute: ActivatedRoute,
	) {
		// this.user = this.sharedService.getShareData('currentUser');
		
	}

	ngOnInit() {
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
					block: false
				}
			}
			else {
				this.pageType = 'edit';
				this.user = this.sharedService.getShareData('currentUser');
			}
		})
		if (this.user.gender == 'female') {
			$('#gender').prop('selectedIndex', 1);
		}
		$('#gender').material_select();
	}

	goBack() {
		this.location.back();
	}

	onDeleteUserButtonTap() {
		alert('onDeleteUserButtonTap');
	}

	onSaveButtonTap() {
		alert('onSaveButtonTap');
	}

}
