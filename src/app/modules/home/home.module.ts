import { NgModule } from '@angular/core';
import { PortailComponent } from './portail/portail.component';
import { HomeRoutingModule } from './home.routing.module';
import { WidgetModule } from 'src/app/core/widgets/widget.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HommeComponent } from './home/home.component';
import { PartieComponent } from './poker/partie/partie.component';
import { AchatsComponent } from './achats/achats.component';
import { VehiculeComponent } from './achats/vehicule/vehicule.component';
import { ImmoComponent } from './achats/immo/immo.component';
import { AddImmoComponent } from './achats/immo/add_immo/add_immo.component';
import { AddVehiculeComponent } from './achats/vehicule/add_vehicule/add_vehicule.component';
import { BanqueComponent } from './banque/banque.component';
import { PretComponent } from './banque/pret/pret.component';
import { DiscothequeComponent } from './discotheque/discotheque.component';
import { ListHistoComponent } from './banque/list_disco/list_histo.component';
import { ListComponent } from './banque/list/list.component';
import { MessageComponent } from './banque/message/message.component';
import { ChoiceComponent } from './poker/choice/choice.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { PostListComponent } from './forum/posts/postlist/postlist.component';
import { PostViewComponent } from './forum/posts/post-view/post-view.component';
import { SinglePostListComponent } from './forum/posts/single-post/single-post.component';
import { EditPostComponent } from './forum/posts/edit-post/edit-post.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { CommentComponent } from './forum/comments/comment.component';
import { EditCommentComponent } from './forum/comments/edit-comment/edit-comment.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxMdModule } from 'ngx-md';
@NgModule({
  declarations: [
    PortailComponent,
    HommeComponent,
    PartieComponent,
    AchatsComponent,
    VehiculeComponent,
    ImmoComponent,
    AddImmoComponent,
    AddVehiculeComponent,
    BanqueComponent,
    PretComponent,
    DiscothequeComponent,
    ListComponent,
    ListHistoComponent,
    MessageComponent,
    ChoiceComponent,
    PostListComponent,
    PostViewComponent,
    SinglePostListComponent,
    EditPostComponent,
    TimeAgoPipe,
    CommentComponent,
    EditCommentComponent
  ],
  imports: [
    HomeRoutingModule,
    WidgetModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot(),
    AngularEditorModule,
    NgxMdModule.forRoot()
  ],
  exports: [
    PretComponent,
    ListComponent,
    ListHistoComponent,
    MessageComponent
  ],
  entryComponents: [AddImmoComponent, AddVehiculeComponent, PretComponent, MessageComponent, EditPostComponent, EditCommentComponent ],
})
export class HomeModule { }
