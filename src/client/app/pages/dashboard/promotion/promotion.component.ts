import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService, Pagination } from '../../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/**
 * This class represents the lazy loaded PromotionComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-promotion',
    templateUrl: 'promotion.component.html',
    styleUrls: ['promotion.component.css']
})
export class PromotionComponent implements OnInit {
    public promotionList: Array<any>;
    public pagination: any;
    constructor(
        private router: Router,
        private sharedService: SharedService,
        private parseService: ParseSDKService,
    ) {
        var self = this;
        this.pagination = new Pagination();
        this.pagination.page = 1;
        this.pagination.perPage = 5;
        this.pagination.enableLoading = true;
        this.pagination.enableMaxPageMode = true;
        this.pagination.maxPageInPagination = 5;
        this.pagination.getNumOfPage = function () {
            return self.parseService.cloud('countObject', {
                className: 'Promotion'
            })
        }
        this.pagination.getData = function (page: number, perPage: number) {
            return self.parseService.cloud('getPromotionList', {
                page: page,
                limit: perPage
            })
        }
    }

    ngOnInit() {
        var self = this;
        this.getPromotionList(self.pagination.page);
        this.getPageNumber();
    }

    getPageNumber() {
        var self = this;
        this.pagination.executeGetNumOfPage();
    }

    getPromotionList(page: any) {
        var self = this;
        this.pagination.getPage(page)
            .then(function (res: any) {
                console.log(res);
                if (res && res.success) {
                    self.promotionList = [];
                    if (res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                            self.promotionList.push({
                                id: res.data[i].id,
                                name: res.data[i].get('name'),
                                description: res.data[i].get('description'),
                                percent: (res.data[i].get('percent') ? res.data[i].get('percent') : 0) * 100,
                                start_date: res.data[i].get('start_date'),
                                end_date: res.data[i].get('end_date')
                            })
                        }
                    }
                }
            })
            .catch(function (err: any) {
                console.log("error ")
            })
    }

    showPromotionDetails(promotion: any) {
        // var index = args.currentTarget.children[0].innerText - 1;
        this.sharedService.setShareData('currentPromotion', promotion);
        this.router.navigate(['dashboard/promotion/' + promotion.id]);
    }
}

