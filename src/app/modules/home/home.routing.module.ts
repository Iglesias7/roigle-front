import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';
import { PortailComponent } from './portail/portail.component';
import { HommeComponent } from './home/home.component';
import { CommuneComponent } from './commune/commune.component';
import { HabitantComponent } from './commune/habitants/habitants.component';
import { MonCompteComponent } from './commune/mon_compte/mon_compte.component';
import { PartieComponent } from './poker/partie/partie.component';
import { AchatsComponent } from './achats/achats.component';
import { ImmoComponent } from './achats/immo/immo.component';
import { VehiculeComponent } from './achats/vehicule/vehicule.component';
import { BanqueComponent } from './banque/banque.component';
import { DiscothequeComponent } from './discotheque/discotheque.component';
import { ChoiceComponent } from './poker/choice/choice.component';
import { PostListComponent } from './forum/posts/postlist/postlist.component';
import { SinglePostListComponent } from './forum/posts/single-post/single-post.component';

const routes: Routes = [

  { path: '', component: HommeComponent , data: { title: 'PAGE_TITLES.HOME' }},
  { path: 'commune', component: CommuneComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.COMMUNE' }},
  { path: 'compte', component: MonCompteComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.COMPTE', ParentTitle: 'PAGE_TITLES.COMMUNE', url: '/compte' }},
  { path: 'habitants', component: HabitantComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.HABITANTS', ParentTitle: 'PAGE_TITLES.COMMUNE', url: '/compte'  } },
  { path: 'friends/:name', component: HabitantComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.AMIS', ParentTitle: 'PAGE_TITLES.COMMUNE', url: '/compte'  } },
  { path: 'achats', component: AchatsComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.ACHATS'} },
  { path: 'immobilier', component: ImmoComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.IMMOBILIERS', ParentTitle: 'PAGE_TITLES.ACHATS', url: '/ahats' } },
  { path: 'vehicule', component: VehiculeComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.VEHICULES', ParentTitle: 'PAGE_TITLES.ACHATS', url: '/ahats' } },
  { path: 'choice', component: ChoiceComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.CHOICE' } },
  { path: 'discotheque', component: DiscothequeComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.DISCOTHEQUE' } },
  { path: 'friends-ask/:name', component: HabitantComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.AMIS_DEMANDE', ParentTitle: 'PAGE_TITLES.COMMUNE', url: '/compte'  } },
  { path: 'friends-receive/:name', component: HabitantComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.AMIS_RECUS', ParentTitle: 'PAGE_TITLES.COMMUNE', url: '/compte'  } },
  { path: 'banque', component: BanqueComponent , canActivate: [AuthGuardService], data: {title: 'PAGE_TITLES.BANQUE' }},
  { path: 'forum', component: PostListComponent , canActivate: [AuthGuardService], data: {title: 'PAGE_TITLES.FORUM' }},
  { path: 'single-post/:id', component: SinglePostListComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.DETAILS_POST', ParentTitle: 'PAGE_TITLES.FORUM', url: '/forum'} },
  { path: 'partie/:id', component: PartieComponent , canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.PARTIE' } },
  { path: 'home', component: PortailComponent, canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.TABLEAU_DE_BORD' }},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
