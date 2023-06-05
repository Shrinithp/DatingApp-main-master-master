import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';


// import {ToastrModule} from 'ngx-toastr';

//no imports just for sample i have given BsDropModule

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
  
    
  ],
  exports: [
    BsDropdownModule,
    TabsModule,
    // ToastrModule
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule

  ]
})
export class SharedModule { }
