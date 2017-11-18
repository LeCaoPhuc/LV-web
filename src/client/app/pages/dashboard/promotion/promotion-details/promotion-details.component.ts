import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
declare var moment: any;
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
    public formInvalid: any = {
        nameRequired: false,
        percentRequired: false,
        startDateRequired: false,
        startDateAfterEndDate: false,
        startDateBeforeToDay: false,
        endDateRequired: false,
        endDateBeforeStartDate: false,
        endDateBeforeToDay: false
    };

    public promotionDetail: any = [];

    constructor(
        private sharedService: SharedService,
        private location: Location,
        private router: Router,
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
                    start_date: self.dateToPickerDate(),
                    end_date: self.dateToPickerDate()
                }
            } else {
                var promotionShared = self.sharedService.getShareData('currentPromotion');
                if (promotionShared) {
                    self.promotion = {
                        id: promotionShared.id,
                        name: promotionShared.name,
                        description: promotionShared.description,
                        percent: promotionShared.percent,
                        start_date: self.dateToPickerDate(promotionShared.start_date),
                        end_date: self.dateToPickerDate(promotionShared.end_date)
                    }
                } else {
                    self.parse.cloud('getPromotion', {
                        promotionId: params['id']
                    }).then(function (res: any) {
                        var promotionObj = res.data;
                        self.promotion = {
                            id: promotionObj.id,
                            name: promotionObj.get('name'),
                            description: promotionObj.get('description'),
                            percent: (promotionObj.get('percent') ? promotionObj.get('percent') : 0) * 100,
                            start_date: self.dateToPickerDate(promotionObj.get('start_date')),
                            end_date: self.dateToPickerDate(promotionObj.get('end_date'))
                        }
                    });
                }
            }
        })
    }

    savePromotion(savePromotion: any) {
        var self = this;
        if (savePromotion.valid && !self.checkFormInvalid(savePromotion)) {
            if (!self.promotion || !self.promotion.name) return;
            self.parse.cloud('savePromotion', {
                id: self.promotion.id,
                name: self.promotion.name,
                description: self.promotion.description,
                percent: self.promotion.percent / 100,
                startDate: self.promotion.start_date,
                endDate: self.promotion.end_date
            }).then(function (res: any) {
                alert('Lưu thành công');
                self.router.navigate(['dashboard/promotion']);
                console.log(res);
            }).catch(function (err: any) {
                console.log(err);
            })
        }
    }

    goBack() {
        this.router.navigate(['dashboard/promotion']);
    }

    onDeletePromotionButtonTap() {
        alert('onDeletePromotionButtonTap');
    }

    onSaveButtonTap() {
        alert('onSaveButtonTap');
    }

    promotionNameErrorMessage(event: any) {
        if (!event) {
            this.formInvalid.nameRequired = false;
        } else if (event && event.required) {
            this.formInvalid.nameRequired = true;
        }
    }

    percentErrorMessage(event: any) {
        if (!event) {
            this.formInvalid.percentRequired = false;
        } else if (event && event.required) {
            this.formInvalid.percentRequired = true;
        }
    }

    onMaterialStartDatePickerEmiter(event: any) {
        this.checkDate(true, false);
        if (this.formInvalid.endDateBeforeStartDate) {
            this.checkDate(false, true);
        }
    }

    onMaterialEndDatePickerEmiter(event: any) {
        this.checkDate(false, true);
        if (this.formInvalid.startDateAfterEndDate) {
            this.checkDate(true, false);
        }
    }

    resetVaidForm() {
        this.formInvalid = {
            nameRequired: false,
            percentRequired: false,
            startDateRequired: false,
            startDateAfterEndDate: false,
            startDateBeforeToDay: false,
            endDateRequired: false,
            endDateBeforeStartDate: false,
            endDateBeforeToDay: false
        };
    }

    checkFormInvalid(form: any) {
        var self = this;

        if (form) {
            // Check name
            if (form.form.controls.name.invalid) {
                self.formInvalid.nameRequired = true;
            } else {
                self.formInvalid.nameRequired = false;
            }

            // Check percent
            if (form.form.controls.percent.invalid) {
                self.formInvalid.percentRequired = true;
            } else {
                self.formInvalid.percentRequired = false;
            }

            var checkDate = self.checkDate(true, true);
            if (!self.formInvalid.percentRequired || !self.formInvalid.nameRequired || !checkDate) {
                return true;
            }
        }
        return false;
    }

    checkDate(checkStartDate: boolean, checkEndDate: boolean) {
        var self = this;
        var date = new Date();
        var today = new moment();

        var startDate = new moment((self.promotion.start_date ? new Date(self.promotion.start_date) : date));
        var endDate = new moment((self.promotion.end_date ? new Date(self.promotion.end_date) : date));
        if (checkStartDate) {
            if (!self.promotion.start_date) {
                self.formInvalid.startDateRequired = true;
                self.formInvalid.startDateBeforeToDay = false;
                self.formInvalid.startDateAfterEndDate = false;
            } else if (self.promotion.end_date && endDate.diff(startDate, 'day') < 0) {
                self.formInvalid.startDateRequired = false;
                self.formInvalid.startDateBeforeToDay = false;
                self.formInvalid.startDateAfterEndDate = true;
            } else {
                self.formInvalid.startDateRequired = false;
                self.formInvalid.startDateBeforeToDay = false;
                self.formInvalid.startDateAfterEndDate = false;
            }
        }
        if (checkEndDate) {
            if (!self.promotion.end_date) {
                self.formInvalid.endDateRequired = true;
                self.formInvalid.endDateBeforeToDay = false;
                self.formInvalid.endDateBeforeStartDate = false;
            } else if (self.promotion.start_date && endDate.diff(startDate, 'day') < 0) {
                self.formInvalid.endDateRequired = false;
                self.formInvalid.endDateBeforeToDay = false;
                self.formInvalid.endDateBeforeStartDate = true;
            } else {
                self.formInvalid.endDateRequired = false;
                self.formInvalid.endDateBeforeToDay = false;
                self.formInvalid.endDateBeforeStartDate = false;
            }
        }
        if (!self.formInvalid.startDateRequired || !self.formInvalid.startDateBeforeToDay ||
            !self.formInvalid.startDateAfterEndDate) {
            return false;
        } else {
            return true;
        }
    }

    dateToPickerDate(date?: any) {
        if (!date) {
            date = new Date();
        }
        var dt = new moment(date);
        return dt.format('ddd MMM DD YYYY');
    }
}
