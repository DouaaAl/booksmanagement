import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersettingsComponent } from './pages/usersettings/usersettings.component';
import { BillviewerComponent } from './components/billviewer/billviewer.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title:"home Page"
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: "dashboard page"
    }, 
    {
        path: 'profile',
        component: UsersettingsComponent
    },
    {
        path: 'bill/:id',
        component: BillviewerComponent
    }
];
