import { Routes } from '@angular/router';
import { AdminComponent } from './admin/layouts/layouts/admin.component';
import { DashBoardComponent } from './admin/components/dashboard/dashBoard.component';
import { CalendarComponent} from './admin/components/calendar/calendar.component';
import { UserListComponent } from './admin/components/user-list/user-list.component';
import { SellerListComponent } from './admin/components/user-list/seller-list.component';
import { AuctionCreateComponent } from './admin/components/auction/auction-create.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginRedirectGuard } from './loginRedirect.guard';
import { NotFoundComponent } from './admin/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'admin',
        component:AdminComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashBoardComponent,
                data:{
                    addActive: 'dashboard',
                }
            },
            {
                path: 'dashboard',
                component: DashBoardComponent,
                data:{
                    addActive: 'dashboard',
                }
            },
            {
                path: 'calendar',
                component:CalendarComponent,
                data:{
                    addActive: 'calendar',
                }
            },
            {
                path:'user-list',
                component:UserListComponent,
                data:{
                    addActive: 'buyer',
                }
            },
            {
                path:'seller-list',
                component:SellerListComponent,
                data:{
                    addActive: 'seller',
                }
            },
            {
                path:'auction-create',
                component:AuctionCreateComponent,
                data:{
                    addActive: 'auctionCreate',
                }
            }
        ]
    },
    {
        path: '',
        component:LoginComponent,
        canActivate: [LoginRedirectGuard],

    },
    {
        path: 'login',
        component:LoginComponent,
        canActivate: [LoginRedirectGuard],
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
