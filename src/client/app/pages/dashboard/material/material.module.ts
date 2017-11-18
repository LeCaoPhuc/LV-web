import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService, PipesModule } from '../../../shared/index';
import { MaterialDetailsModule } from './material-details/index';

@NgModule({
    imports: [SharedModule, CommonModule, PipesModule, MaterialDetailsModule],
    declarations: [MaterialComponent],
    exports: [MaterialComponent]
})
export class MaterialModule { }
