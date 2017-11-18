import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
/**
 * This class represents the lazy loaded PromotionDetailsComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-promotion-details',
    templateUrl: 'promotion-details.component.html',
    styleUrls: ['promotion-details.component.css'],
})
export class PromotionDetailsComponent implements OnInit {
    public promotion: any = {
        id: '',
        name: '',
        description: '',
        percent: 0,
        start_date: new Date(),
        end_date: new Date()
    };
    public promotionDetail: any = [];

    constructor(
        private sharedService: SharedService,
        private location: Location,
        private activatedRoute: ActivatedRoute,
        private parse: ParseSDKService
    ) {
        // this.promotion = this.sharedService.getShareData('currentProduct');

    }

    ngOnInit() {
        var self = this;
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] == 'new') {
                this.promotion = {
                    id: '',
                    name: '',
                    description: '',
                    percent: 0,
                    start_date: new Date(),
                    end_date: new Date()
                }
            } else {
                self.promotion = self.sharedService.getShareData('currentPromotion');
                if (self.promotion) {
                    self.promotion = {
                        id: self.promotion.id,
                        name: self.promotion.name,
                        description: self.promotion.description,
                        percent: self.promotion.percent,
                        start_date: self.promotion.start_date,
                        end_date: self.promotion.end_date
                    }
                } else {
                    self.parse.cloud('getPromotion', {
                        promotionId: params['id']
                    }).then(function (res: any) {
                        self.promotion = res.data;
                        self.promotion = {
                            id: self.promotion.id,
                            name: self.promotion.get('name'),
                            description: self.promotion.get('description'),
                            percent: (self.promotion.get('percent') ? self.promotion.get('percent') : 0) * 100,
                            start_date: self.promotion.get('start_date'),
                            end_date: self.promotion.get('end_date')
                        }
                    });
                }
            }
        })
    }

    savePromotion() {
        if (!this.promotion || !this.promotion.name) return;
        this.parse.cloud('savePromotion', {
            id: this.promotion.id,
            name: this.promotion.name,
            description: this.promotion.description,
            percent: this.promotion.percent,
            start_date: this.promotion.start_date,
            end_date: this.promotion.end_date
        }).then(function (res: any) {
            console.log(res);
        }).catch(function (err: any) {
            console.log(err);
        })
    }

    goBack() {
        this.location.back();
    }

    onDeletePromotionButtonTap() {
        alert('onDeletePromotionButtonTap');
    }

    onSaveButtonTap() {
        alert('onSaveButtonTap');
    }
}
