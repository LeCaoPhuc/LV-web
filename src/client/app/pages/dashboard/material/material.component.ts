import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, ParseUser, SharedService, Pagination } from '../../../shared/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/**
 * This class represents the lazy loaded PromotionComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-material',
    templateUrl: 'material.component.html',
    styleUrls: ['material.component.css']
})
export class MaterialComponent implements OnInit {
    public materialList: Array<any>;
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
                className: 'Material'
            })
        }
        this.pagination.getData = function (page: number, perPage: number) {
            return self.parseService.cloud('getMaterialList', {
                page: page,
                limit: perPage
            })
        }
    }

    ngOnInit() {
        var self = this;
        this.getMaterialList(self.pagination.page);
        this.getPageNumber();
    }

    getPageNumber() {
        var self = this;
        this.pagination.executeGetNumOfPage();
    }

    getMaterialList(page: any) {
        var self = this;
        this.pagination.getPage(page)
            .then(function (res: any) {
                console.log(res);
                if (res && res.success) {
                    self.materialList = [];
                    if (res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                            self.materialList.push({
                                id: res.data[i].id,
                                name: res.data[i].get('material_name'),
                                description: res.data[i].get('description')
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
        this.router.navigate(['dashboard/material/new']);
    }

    showMaterialDetails(material: any) {
        // var index = args.currentTarget.children[0].innerText - 1;
        this.sharedService.setShareData('currentMaterial', material);
        this.router.navigate(['dashboard/material/' + material.id]);
    }
}