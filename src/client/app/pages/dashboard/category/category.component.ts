import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService, Pagination } from '../../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/**
 * This class represents the lazy loaded UserComponent.
 */
@Component({
	moduleId: module.id,
	selector: 'sd-category',
	templateUrl: 'category.component.html',
	styleUrls: ['category.component.css'],
})
export class CategoryComponent implements OnInit {
    public categoryList: Array<any>;
	public pagination: any;
	constructor(
		private router: Router,
		private sharedService: SharedService,
		private parseService: ParseSDKService,
        private changeDetectorRef : ChangeDetectorRef
	) {
        var self = this;
		this.pagination = new Pagination();
		this.pagination.page = 1;
		this.pagination.perPage = 10;
		this.pagination.enableLoading = true;
		this.pagination.enableMaxPageMode = true;
		this.pagination.maxPageInPagination = 5;
		this.pagination.getNumOfPage = function () {
			return self.parseService.cloud('countObject', {
				className: 'Category'
			})
		}
		this.pagination.getData = function (page: number, perPage: number) {
			return self.parseService.cloud('getCategoryList', {
				page: page,
				limit: perPage
			})
		}
    }
     ngOnInit() {
    var self = this;
    this.getPageNumber();
    this.getCategory(1);
  }

  getCategory(page: number) {
    var self = this;
    this.pagination.getPage(page).then(function (res: any) {
      self.categoryList = res.data;
      self.changeDetectorRef.detectChanges();
    }).catch(function(){
    })
  }

  getPageNumber() {
    var self = this;
    this.pagination.executeGetNumOfPage();
  }

  showCategoryDetails(category: any) {
    // var index = args.currentTarget.children[0].innerText - 1;
    this.sharedService.setShareData('currentCategory', category);
    this.router.navigate(['dashboard/categry/' + category.id]);
  }
  onAddButtonTap(args: any) {
    this.router.navigate(['dashboard/category/new']);
  }
}