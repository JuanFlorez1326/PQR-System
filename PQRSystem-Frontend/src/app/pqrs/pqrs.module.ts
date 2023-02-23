import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPqrsComponent } from './components/all-pqrs/all-pqrs.component';
import { CreatePqrsComponent } from './components/create-pqrs/create-pqrs.component';
import { CardPqrsComponent } from './components/card-pqrs/card-pqrs.component';
import { PqrComponent } from './pages/pqr/pqr.component';
import { SeePqrComponent } from './pages/see-pqr/see-pqr.component';



@NgModule({
  declarations: [
    AllPqrsComponent,
    CreatePqrsComponent,
    CardPqrsComponent,
    PqrComponent,
    SeePqrComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PqrsModule { }
