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
    private category: any = {
        id: '',
        name: '',
        image: '',
        productCount: 0
    };
    constructor(
        private router: Router,
        private sharedService: SharedService,
        private parseService: ParseSDKService,
        private activatedRoute: ActivatedRoute
    ) {
    }
    ngOnInit() {
        console.log('ngOnitit');
        var self = this;
        this.activatedRoute.params.subscribe((params: Params) => {
            if (params['id'] == 'new') {
                this.category = {
                    id: '',
                    name: '',
                    image: '',
                    productCount: 0
                }
            } else {
                var categoryShared = self.sharedService.getShareData('currentCategory');
                if (categoryShared) {
                    self.category = {
                        id: categoryShared.id,
                        name: categoryShared.get('category_name'),
                        image: categoryShared.get('image'),
                        productCount: categoryShared.get('count_product')
                    };
                } else {
                    self.parseService.cloud('getCategoryWithId', {
                        id: params['id']
                    }).then(function (res: any) {
                        var categoryObj = res.data;
                        self.category = {
                            id: categoryObj.id,
                            name: categoryObj.get('category_name'),
                            image: categoryObj.get('count_product'),
                        }
                    });
                }
            }
        })
    }
    changePhoto(event: any) {
        var self = this;
        var file: any = event.files[0];
        this.parseService.file('product-avatar', file)
            .then(function (file: any) {
                console.log(file);
                self.category.image = file;
            })
            .catch(function (err: any) {
                console.log(err);
            })
        event.value = null;
    }
    saveCategory(categoryForm: any) {
        if (categoryForm.invalid) {
            console.log('invalid');
        }
        else {
            if (!this.category.image) {
                console.log('image was not undefine');
            }
            else {
                var self = this;
                this.parseService.cloud('saveCategory',this.category)
                .then(function(res:any){
                    if(res && res.success) {
                        alert('Lưu thành công');
                    }
                    else {
                          alert('Lưu thất bại');
                    }
                })
                .catch(function(err){
                    console.log(err);
                    alert('Xảy ra lỗi khi lưu dữ liệu!');
                })
            }
        }
    }
    goBack() {
        this.router.navigate(['dashboard/category']);
    }
      deleteCategory() {
        var self = this;
        var r = confirm("Bạn có muốn xóa loại sản phẩm này !");
		if (r == true) {
			self.parseService.cloud('deleteObject', {
                className: 'Category',
                id: self.category.id
            }).then(function () {
                self.router.navigate(['dashboard/category']);
            })
		}
    }
}
