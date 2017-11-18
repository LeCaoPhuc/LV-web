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
    selector: 'sd-material-details',
    templateUrl: 'material-details.component.html',
    styleUrls: ['material-details.component.css'],
})
export class MaterialDetailsComponent implements OnInit {
    public material: any = {
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
                this.material = {
                    id: '',
                    name: '',
                    description: ''
                }
            } else {
                var materialShared = self.sharedService.getShareData('currentMaterial');
                if (materialShared) {
                    self.material = {
                        id: materialShared.id,
                        name: materialShared.name,
                        description: materialShared.description
                    }
                } else {
                    self.parse.cloud('getMaterial', {
                        materialId: params['id']
                    }).then(function (res: any) {
                        var materialObj = res.data;
                        self.material = {
                            id: materialObj.id,
                            name: materialObj.get('material_name'),
                            description: materialObj.get('description'),
                        }
                    });
                }
            }
        })
    }

    saveMaterial(materialForm: any) {
        var self = this;
        self.resetVaidForm();
        if (!self.checkFormInvalid(materialForm)) {
            if (!self.material || !self.material.name) return;
            self.parse.cloud('saveMaterial', {
                id: self.material.id,
                name: self.material.name,
                description: self.material.description,
            }).then(function (res: any) {
                alert('Lưu thành công');
                self.router.navigate(['dashboard/material']);
                console.log(res);
            }).catch(function (err: any) {
                console.log(err);
            })
        }
    }

    goBack() {
        this.router.navigate(['dashboard/material']);
    }

    onDeleteMaterialButtonTap() {
        var self = this;
        self.parse.cloud('deleteMaterial', {
            materialId: self.material.id
        }).then(function () {
            self.router.navigate(['dashboard/material']);
        })
    }

    onSaveButtonTap() {
        alert('onSaveButtonTap');
    }

    materialNameErrorMessage(event: any) {
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
