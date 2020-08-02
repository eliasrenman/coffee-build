import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../assets/logo/logo.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
    { path: '', component: HomeComponent }
];


@NgModule({
    declarations: [
        LogoComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class HomeModule { }
  