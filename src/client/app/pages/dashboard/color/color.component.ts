import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService, Pagination } from '../../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/**
 * This class represents the lazy loaded PromotionComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-color',
    templateUrl: 'color.component.html',
    styleUrls: ['color.component.css']
})
export class ColorComponent implements OnInit {
    public colorList: Array<any>;
    public pagination: any;
    constructor(
        private router: Router,
        private sharedService: SharedService,
        private parseService: ParseSDKService,
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
                className: 'Color'
            })
        }
        this.pagination.getData = function (page: number, perPage: number) {
            return self.parseService.cloud('getColorList', {
                page: page,
                limit: perPage
            })
        }
    }

    ngOnInit() {
        var self = this;
        this.getColorList(self.pagination.page);
        this.getPageNumber();
    }

    getPageNumber() {
        var self = this;
        this.pagination.executeGetNumOfPage();
    }

    getColorList(page: any) {
        var self = this;
        this.pagination.getPage(page)
            .then(function (res: any) {
                console.log(res);
                if (res && res.success) {
                    self.colorList = [];
                    if (res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                            self.colorList.push({
                                id: res.data[i].id,
                                name: res.data[i].get('color_name'),
                                description: res.data[i].get('description'),
                                code: res.data[i].get('color_code')
                            })
                        }
                    }
                }
            })
            .catch(function (err: any) {
                console.log("error")
            })
    }

    onAddButtonTap(args: any) {
        this.router.navigate(['dashboard/color/new']);
    }

    showColorDetails(color: any) {
        // var index = args.currentTarget.children[0].innerText - 1;
        this.sharedService.setShareData('currentColor', color);
        this.router.navigate(['dashboard/color/' + color.id]);
    }
}