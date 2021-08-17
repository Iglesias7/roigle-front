import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/widgets/models/user';
import { CommuneService } from 'src/app/core/services/commune.service';
import { MatDialog, MatTableDataSource, PageEvent } from '@angular/material';
import * as _ from 'lodash';
import { UpdateHabitantComponent } from './update_habitant/update_habitant.component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { PretComponent } from '../../banque/pret/pret.component';
import { PretService } from 'src/app/core/services/pret.service';
import { FriendsService } from 'src/app/core/services/friends.service';
import { FriendsActionsService } from 'src/app/core/services/friendsActions.service';

@Component({
  selector: 'app-commune',
  templateUrl: './habitants.component.html',
  styleUrls: ['./habitants.component.scss']
})

export class HabitantComponent implements OnInit {

  public users: User[];
  public usersBackup: User[] = [];

  public length = 0;
  public pageSize = 6;

  public link: string = this.route.snapshot.params.name;
  public isFollow = false;

  public dataSources: MatTableDataSource<User> = new MatTableDataSource();

  constructor(
    private auth: AuthenticationService,
    public communeService: CommuneService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private pretService: PretService,
    private friendsService: FriendsService,
    private friendsActionsService: FriendsActionsService
  ) {
  }

  ngOnInit() {

    if (this.link === 'f') {
      this.friendsService.getAllFollowers(this.currentUser.id).subscribe(users => {
        this.users = users;
        this.usersBackup = _.cloneDeep(users);
        this.dataSources.data = this.users.slice(0, 6);
        this.length = this.users.length;

        if (users === null) {
          this.users = [];
        }
      });
    } else if (this.link === 'fa') {
      this.friendsService.getAllSends(this.currentUser.id).subscribe(users => {
        this.users = users;
        this.usersBackup = _.cloneDeep(users);
        this.dataSources.data = this.users.slice(0, 6);
        this.length = this.users.length;
        console.log(users);
        if (users === null) {
          this.users = [];
        }
      });
    } else if (this.link === 'fr') {
      this.friendsService.getAllReceived(this.currentUser.id).subscribe(users => {
        this.users = users;
        this.usersBackup = _.cloneDeep(users);
        this.dataSources.data = this.users.slice(0, 6);
        this.length = this.users.length;

        if (users === null) {
          this.users = [];
        }
      });
    } else {
      this.friendsService.getAllUsers().subscribe(users => {
        this.users = users;
        this.usersBackup = _.cloneDeep(users);
        this.dataSources.data = this.users.slice(0, 6);
        this.length = this.users.length;
        this.link = 'h';

        if (users === null) {
          this.users = [];
        }

        this.friendsService.getAllSends(this.currentUser.id).subscribe(usersSend => {
            users.forEach((user) => {
              if (usersSend.find(u => u.id === user.id) ) {
                user.userIsFollow = true;
              } else {
                user.userIsFollow = false;
              }
            });
        });

        this.friendsService.getAllFollowers(this.currentUser.id).subscribe(friends => {
          users.forEach((user) => {
            if (friends.find(u => u.id === user.id) ) {
              user.userIsFriends = true;
            } else {
              user.userIsFriends = false;
            }
          });
        });

        this.friendsService.getAllReceived(this.currentUser.id).subscribe(usersReceived => {
          users.forEach((user) => {
            if (usersReceived.find(u => u.id === user.id) ) {
              user.userIsReceive = true;
            } else {
              user.userIsReceive = false;
            }
          });
        });
      });
    }
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.dataSources.data = this.users.slice(startIndex, endIndex);
  }

  filterChanged(filter: string) {
    const lFilter = filter.toLowerCase();
    this.users = _.filter(this.usersBackup, m => {
        const str = (m.firstName + ' ' + m.lastName).toLowerCase();
        return str.includes(lFilter);
    });
    this.dataSources.data = this.users.slice(0, 6);
  }

  /* actions  sur un utilisateur */

  delete(user: User) {
    // const backup = this.dataSources.data;
    const dlg = this.utilsService.dialogSuppress({text: `Voulez-vous vraiment supprimer '${user.firstName}' ?`});
    dlg.beforeClose().subscribe(res => {
        if (res) {
          this.communeService.delete(user).subscribe();
        }
      });
  }

  update(user: User) {
    const dlg = this.dialog.open(UpdateHabitantComponent, {
      data: { user },
      panelClass: 'popUp-delete',
      height: '500px'
    });
    const id = user.id;
    dlg.beforeClose().subscribe(res => {
      if (res) {
        _.assign(user, res);
        // tslint:disable-next-line:no-shadowed-variable
        this.communeService.update(res, id).subscribe(res => {
          if (!res) {
            this.utilsService.snackBarError(`Oups erreur dans le serveur. la modification a echoué.`);
          } else {
            this.utilsService.snackBarSuccess(`Les données de cet utilisateur ont été modifier avec succès.`);
          }

          this.ngOnInit();
        });
      }
    });
  }

  /* Emprunter de l'argent à un amis */

  accepter(user: User) {
    this.friendsActionsService.accept(this.auth.currentUser, user.id).subscribe(() => {
      this.ngOnInit();
    });
  }

  refuser(user: User) {
    this.friendsActionsService.refuser(this.auth.currentUser, user.id).subscribe(() => {
      this.ngOnInit();
    });
  }

  unfollow(user: User) {
    this.friendsActionsService.unfollow(this.auth.currentUser, user.id).subscribe(() => {
      this.ngOnInit();
    });
  }

  follow(user: User) {
    this.friendsActionsService.follow(this.auth.currentUser, user.id).subscribe(() => {
      user.userIsFollow = true;
    });
  }

  annuler(user: User) {
    this.friendsActionsService.annuler(this.auth.currentUser, user.id).subscribe(() => {
      if (this.link === 'fa') {
        this.ngOnInit();
      } else {
        user.userIsFollow = false;
      }

    });
  }

  /* Emprunter de l'argent à un amis */
  pageEvent: void;

  emprunter(user: User) {
    const dlg = this.dialog.open(PretComponent, {
      data: { user },
      panelClass: 'popUp-delete'
    });

    const id = user.id;
    const idCompte = this.currentUser.compte.id;
    const email = user.email;

    dlg.beforeClose().subscribe(pret => {
      if (pret) {
        // _.assign(pret, res);
        this.pretService.askPret(idCompte, email, pret).subscribe(res => {
          if (!res) {
            this.utilsService.snackBarError(`Oups erreur dans le serveur. le pret a echoué.`);
          } else {
            this.utilsService.snackBarSuccess(`Un message de demande de pret vient d'etre envoyer à ${user.firstName}.`);
          }

          this.ngOnInit();
        });
      }
    });
  }

}
