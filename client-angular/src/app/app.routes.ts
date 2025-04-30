import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ShowUsersComponent } from './component/show-users/show-users.component';

export const routes: Routes = [
    {path: 'Login',component: LoginComponent},
    {path: 'Show-User',component: ShowUsersComponent},
];
