import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService } from '../../../shared/index';
import { UserDetailsModule } from "./user-details/index";

@NgModule({
  imports: [SharedModule, CommonModule, UserDetailsModule],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserModule { }
