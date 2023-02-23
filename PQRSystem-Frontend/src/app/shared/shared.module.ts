import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterPqrComponent } from './footer-pqr/footer-pqr.component';
import { SidebarPqrComponent } from './sidebar-pqr/sidebar-pqr.component';



@NgModule({
  declarations: [
    FooterPqrComponent,
    SidebarPqrComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
