import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { NgxSelectModule } from 'ngx-select-ex'
import { IMaskModule } from 'angular-imask';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-img-cropper';

import { SharedModule } from '../../shared/shared.module';
import { StandardComponent } from './standard/standard.component';
import { ExtendedComponent } from './extended/extended.component';
import { ValidationComponent } from './validation/validation.component';
import { UploadComponent } from './upload/upload.component';
import { CropperComponent } from './cropper/cropper.component';

const routes: Routes = [
    { path: 'standard', component: StandardComponent },
    { path: 'extended', component: ExtendedComponent },
    { path: 'validation', component: ValidationComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'cropper', component: CropperComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NgxSelectModule,
        ColorPickerModule,
        IMaskModule,
        CustomFormsModule,
        FileUploadModule,
        ImageCropperModule
    ],
    providers: [ColorPickerService],
    declarations: [
        StandardComponent,
        ExtendedComponent,
        ValidationComponent,
        UploadComponent,
        CropperComponent
    ],
    exports: [
        RouterModule
    ]
})
export class FormsModule { }
