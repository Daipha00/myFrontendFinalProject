import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { ManageComponent } from './manage/manage.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SidenavDetailsComponent } from './sidenav-details/sidenav-details.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';
import { ViewDetailsComponent } from './view-details/view-details.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'container',component:HeaderNavComponent,
    children:[
      {path:'nav-details',component:SidenavDetailsComponent},
      {path:'member',component:MemberRegistrationComponent},
    
      {path:'manage',component:ManageComponent},
      {path:'update/:membershipNo',component:UpdateComponent},
      {path:'view',component:ViewDetailsComponent}
      // {path:'manage',component:ManageComponent},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
