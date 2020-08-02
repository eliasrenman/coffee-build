import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { SubscribedDevicesComponent } from './subscribed-devices/subscribed-devices.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserMenuComponent } from './toolbar/user-menu/user-menu.component';
import { UniqueEndpointComponent } from './unique-endpoint/unique-endpoint.component';
import { UsageGuideComponent } from './usage-guide/usage-guide.component';


const routes: Routes = [
  { path: '', component: DashboardComponent }
];


@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    UserMenuComponent,
    UniqueEndpointComponent,
    SubscribedDevicesComponent,
    UsageGuideComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
