import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService } from '../../../../shared/index';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent]
})
export class UserDetailsModule { }
