import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewuserComponent } from './newuser/newuser.component';
import { LoginComponent } from './login/login.component';
import { LabnewComponent } from './labnew/labnew.component';
import { LabeditComponent } from './labedit/labedit.component';
import { LabviewComponent } from './labview/labview.component';
import { StornewComponent } from './stornew/stornew.component';
import { StorviewComponent } from './storview/storview.component';
import { StoreditComponent } from './storedit/storedit.component';
import { LabdetailsComponent } from './labdetails/labdetails.component';
import { StordetailsComponent } from './stordetails/stordetails.component';
import { SampnewComponent } from './sampnew/sampnew.component';
import { SampdetailsComponent } from './sampdetails/sampdetails.component';
import { SampviewComponent } from './sampview/sampview.component';
import { SampeditComponent } from './sampedit/sampedit.component';
import { MainComponent} from './main/main.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { AllusersComponent } from './allusers/allusers.component';
import { EdituserComponent } from './edituser/edituser.component';
import { HeadlineComponent } from './headline/headline.component';
import { DragulaComponent } from './dragula/dragula.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'main', component: MainComponent, children: [
		{ path: 'dragula', component: DragulaComponent },
		{ path: 'newuser', component: NewuserComponent },
		{ path: 'headline', component: HeadlineComponent },
		{ path:'labnew', component:LabnewComponent },
		{ path:'labdetails/:id', component:LabdetailsComponent },
		{ path:'labedit/:id', component:LabeditComponent },
		{ path:'labview', component:LabviewComponent },
		{ path:'stornew', component:StornewComponent },
		{ path:'stordetails/:id', component:StordetailsComponent },
		{ path:'storedit/:id', component:StoreditComponent },
		{ path:'storview', component:StorviewComponent },
		{ path:'sampnew', component:SampnewComponent },
		{ path:'sampdetails/:id', component:SampdetailsComponent },
		{ path:'sampedit/:id', component:SampeditComponent },
		{ path:'sampview', component:SampviewComponent },
    	{ path: 'viewuser/:id', component: ViewuserComponent },
		{ path: 'allusers', component: AllusersComponent },
		{ path: 'edituser/:id', component: EdituserComponent },
		{ path: '*', redirectTo: '/main', pathMatch: 'full' }
	]},
  	{ path: '**', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}