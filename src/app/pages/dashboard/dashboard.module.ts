import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserMenuComponent } from './toolbar/user-menu/user-menu.component';


const routes: Routes = [
  { path: '', component: DashboardComponent }
];


@NgModule({
  declarations: [DashboardComponent, ToolbarComponent, UserMenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
