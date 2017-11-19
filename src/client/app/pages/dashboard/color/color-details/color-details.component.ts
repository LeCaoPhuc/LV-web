import { Component, OnInit } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
/**
 * This class represents the lazy loaded ColorDetailsComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-color-details',
    templateUrl: 'color-details.component.html',
    styleUrls: ['color-details.component.css'],
})
export class ColorDetailsComponent implements OnInit {
    public color: any = {
        id: '',
        name: '',
        description: '',
        percent: 0,
        start_date: new Date(),
        end_date: new Date()
    };
    public formInvalid: any = {
        nameRequired: false,
    };

    constructor(
        private sharedService: SharedService,
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private parse: ParseSDKService
    ) {

    }

    ngOnInit() {
        var self = this;
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] == 'new') {
                this.color = {
                    id: '',
                    name: '',
                    description: '',
                    code: ''
                }
            } else {
                var colorShared = self.sharedService.getShareData('currentColor');
                if (colorShared) {
                    self.color = {
                        id: colorShared.id,
                        name: colorShared.name,
                        code: colorShared.code,
                        description: colorShared.description
                    };
                } else {
                    self.parse.cloud('getColor', {
                        colorId: params['id']
                    }).then(function (res: any) {
                        var colorObj = res.data;
                        self.color = {
                            id: colorObj.id,
                            name: colorObj.get('color_name'),
                            description: colorObj.get('description'),
                            code: colorObj.get('color_code'),
                        }
                    });
                }
            }
        })
    }

    saveColor(colorForm: any) {
        var self = this;
        self.resetVaidForm();
        if (!self.checkFormInvalid(colorForm)) {
            if (!self.color || !self.color.name) return;
            self.parse.cloud('saveColor', {
                id: self.color.id,
                name: self.color.name,
                code: self.color.code,
                description: self.color.description,
            }).then(function (res: any) {
                alert('Lưu thành công');
                self.router.navigate(['dashboard/color']);
                console.log(res);
            }).catch(function (err: any) {
                console.log(err);
            })
        }
    }

    goBack() {
        this.router.navigate(['dashboard/color']);
    }

    onDeleteColorButtonTap() {
        var self = this;
        self.parse.cloud('deleteColor', {
            colorId: self.color.id
        }).then(function () {
            self.router.navigate(['dashboard/color']);
        })
    }

    onSaveButtonTap() {
        alert('onSaveButtonTap');
    }

    colorNameErrorMessage(event: any) {
        if (!event) {
            this.formInvalid.nameRequired = false;
        } else if (event && event.required) {
            this.formInvalid.nameRequired = true;
        }
    }

    resetVaidForm() {
        this.formInvalid = {
            nameRequired: false,
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
            if (self.formInvalid.nameRequired) {
                return true;
            }
        }
        return false;
    }

}
