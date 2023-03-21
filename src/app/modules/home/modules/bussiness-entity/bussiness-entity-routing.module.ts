import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BussinessEntityComponent } from './bussiness-entity.component';
import { CreateBusinessEntityComponent } from './components/create-business-entity/create-business-entity.component';
import { EditBusinessEntityComponent } from './components/edit-business-entity/edit-business-entity.component';

const routes: Routes = [
  {
    path:'',
    component:BussinessEntityComponent
  },
  {
    path:'edit/:id',
    component:EditBusinessEntityComponent
  },
  {
    path:'create',
    component:CreateBusinessEntityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BussinessEntityRoutingModule { }
