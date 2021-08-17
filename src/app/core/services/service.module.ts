import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { LoaderService } from './loader.service';
import { CommuneService } from './commune.service';
import { ImmoService } from './immo.service';
import { CompteService } from './compte.service';
import { UtilsService } from './utils.service';
import { CardService } from './card.service';
import { SseService } from './sse.service';
import { FriendsService } from './friends.service';
import { FriendsActionsService } from './friendsActions.service';
import { MatchService } from './match.service';
import { PostService } from './post.service';
import { FilterService } from './filter.service';
import { CommnentService } from './comment.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        AuthGuardService,
        AuthenticationService,
        ErrorService,
        LoaderService,
        CommuneService,
        ImmoService,
        CompteService,
        UtilsService,
        CardService,
        SseService,
        FriendsService,
        FriendsActionsService,
        MatchService,
        PostService,
        FilterService,
        CommnentService
    ],
    declarations: []
})

export class ServiceModule { }
