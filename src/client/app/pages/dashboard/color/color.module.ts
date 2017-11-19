import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService, PipesModule } from '../../../shared/index';
import { ColorDetailsModule } from './color-details/index';

@NgModule({
    imports: [SharedModule, CommonModule, PipesModule, ColorDetailsModule],
    declarations: [ColorComponent],
    exports: [ColorComponent]
})
export class ColorModule { }
