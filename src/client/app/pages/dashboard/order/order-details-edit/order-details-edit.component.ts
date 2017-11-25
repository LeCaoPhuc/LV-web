import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpRequestService, ParseSDKService, SharedService, ToolsService } from '../../../../shared/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
declare var moment: any;
/**
 * This class represents the lazy loaded OrderDetailsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-order-details-edit',
  templateUrl: 'order-details-edit.component.html',
  styleUrls: ['order-details-edit.component.css'],
})
export class OrderDetailsEditComponent implements OnInit {
  public order: any;
  public orderDetail: any = {
    id: '',
    sku: '',
    name: '',
    material: '',
    color: '',
    price: '',
    quantity: '',
    total: '',
    image: ''
  };
  public orderDetailList: any = [];
  @ViewChild('orderDetailModal') orderDetailModal: ElementRef;
  constructor(
    private sharedService: SharedService,
    private parse: ParseSDKService,
    private tools: ToolsService,
    private router: Router,
  ) {
    // this.order = this.sharedService.getShareData('currentOrder');

  }

  ngOnInit() {

  }

  getOrderDetailByOrder(order: any) {
    var self = this;
    this.order = order;
    this.parse.cloud('getOrderDetail', {
      orderId: order.id
    }).then(function (res: any) {
      console.log(res);
      self.orderDetailList = res.data;
    })
  }

  bindingOrderDetail(orderDetailModal: any, item: any) {
    orderDetailModal.open();
    this.orderDetail = {
      id: item.order_detail.id,
      sku: item.product_detail.get('sku'),
      name: item.product_detail.get('product').get('product_name'),
      material: item.product_detail.get('material').get('material_name'),
      color: item.product_detail.get('color').get('color_name'),
      price: item.order_detail.get('unit_price'),
      quantity: item.order_detail.get('quantity_buy'),
      total: item.order_detail.get('total_price_product'),
      image: item.product_detail.get('image')
    }
    console.log(this.orderDetail);
  }

  updateQuantity() {
    console.log('----ccc');
    var self = this;
    this.parse.cloud('updateOrderDetailQuantity', {
      orderId: this.orderDetail.id,
      quantity: this.orderDetail.quantity
    }).then(function (res: any) {
      alert('Cập nhật số lượng thành công!');
    })
    .catch(function(err){
      alert('Cập nhật thất bại');
    })
  }

  deleteOrderDetail(item?: any) {
    var self = this;
    var confirm = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi hóa đơn?');
    if (confirm) {
      var orderDetailId: any = this.orderDetail.id;
      if (item) {
        orderDetailId = item.order_detail.id;
      }
      this.parse.cloud('deleteOrderDetailQuantity', {
        orderId: orderDetailId
      }).then(function (res: any) {
        for (var i in self.orderDetailList) {
          if (orderDetailId == self.orderDetailList[i].order_detail.id) {
            self.orderDetailList.splice(0, 1);
            break;
          }
        }
        alert('Xóa sản phầm khỏi hóa đơn thành công');
        if(item){
          self.orderDetailModal.nativeElement.close();
        }
        if(self.orderDetailList.length == 0){
          self.router.navigate(['dashboard/order']);
        }
      })
      .catch(function(err){
        alert('Xóa thất bại')
      })
    }
  }
}
