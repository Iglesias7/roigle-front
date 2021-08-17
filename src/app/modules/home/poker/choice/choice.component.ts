import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import { User } from 'src/app/core/widgets/models/user';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/core/services/friends.service';
import { MatchService } from 'src/app/core/services/match.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import {PretService} from '../../../../core/services/pret.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})

export class ChoiceComponent implements OnInit {
  friends: any[] = null;
  adversaire: User;
  mise = 1000;
  load = false;

  constructor(
    private auth: AuthenticationService,
    public communeService: CommuneService,
    private router: Router,
    private friendsService: FriendsService,
    private matchService: MatchService,
    private utilsService: UtilsService,
    private pretService: PretService
  ) {
    this.connect();
  }

  ngOnInit() {
    this.friendsService.getAllFollowers(this.currentUser.id).subscribe(users => {
      if (users.length !== 0) {
        this.friends = [];
        users.forEach(user => {
          if (user.maxMise >= this.mise) {
            this.friends.push(user);
          }
        });
      }
    });
  }

  connect(): void {
    const source = new EventSource('http://localhost:3000/.well-known/mercure?topic=' + encodeURIComponent('http://monsite.com/add-match'));
    source.addEventListener('message', id => {
      // console.log(JSON.parse(id.data).message);
      this.utilsService.snackBarInfo(`Un match a été lancé avec vous. Bon match à vous !`);
      this.router.navigate(['/partie/' + JSON.parse(id.data).message]);
    });
 }

  updateUsers() {
    this.ngOnInit();
  }

  refreshCurrentUser() {
    this.communeService.findById(this.auth.currentUser.id).subscribe(u => {
      this.pretService.getRefrechUser(this.auth.currentUser.id);
      this.auth.storeToken(u);
    });
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  select(friend: User) {
    this.adversaire = friend;
  }

  play() {
    const request = {
      mise: this.mise
    };

    this.matchService.addMatch(this.currentUser.id, this.adversaire.email, request).subscribe(() => {
      this.refreshCurrentUser();
    });
  }
}
