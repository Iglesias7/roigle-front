import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';
import { CommuneComponent } from './commune.component';

const routes: Routes = [

  { path: 'commune', component: CommuneComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommuneRoutingModule { }
