import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
/**
 * This class represents the lazy loaded MaterialDetailsComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-category-detail',
    templateUrl: 'category-detail.component.html',
    styleUrls: ['category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
    constructor(
		private router: Router,
		private sharedService: SharedService,
		private parseService: ParseSDKService,
	) {
    }
     ngOnInit() {
      console.log('ngOnitit');
    }
}
