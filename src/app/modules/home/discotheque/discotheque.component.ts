import { Component } from '@angular/core';
import { MatTableDataSource, PageEvent, MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CompteService } from 'src/app/core/services/compte.service';
import { CommuneService } from 'src/app/core/services/commune.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-discotheque',
  templateUrl: './discotheque.component.html',
  styleUrls: ['./discotheque.component.scss']
})
export class DiscothequeComponent {
  vin = [
    {
      name: 'vin1',
      price: '300',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin2',
      price: '10',
      picture: './../../../../assets/vins/2.jpg'
    },
    {
      name: 'vin3',
      price: '5',
      picture: './../../../../assets/vins/3.jpg'
    },
    {
      name: 'vin4',
      price: '12',
      picture: './../../../../assets/vins/4.jpg'
    },
    {
      name: 'vin5',
      price: '200',
      picture: './../../../../assets/vins/11.jpg'
    },
    {
      name: 'vin6',
      price: '55',
      picture: './../../../../assets/vins/5.jpg'
    },
    {
      name: 'vin1',
      price: '25',
      picture: './../../../../assets/vins/6.jpg'
    },
    {
      name: 'vin7',
      price: '25',
      picture: './../../../../assets/vins/7.jpg'
    },
    {
      name: 'vin8',
      price: '25',
      picture: './../../../../assets/vins/8.jpg'
    },
    {
      name: 'vin9',
      price: '25',
      picture: './../../../../assets/vins/9.jpg'
    },
    {
      name: 'vin10',
      price: '25',
      picture: './../../../../assets/vins/10.jpg'
    },
    {
      name: 'vin11',
      price: '25',
      picture: './../../../../assets/vins/18.jpg'
    },
    {
      name: 'vin12',
      price: '25',
      picture: './../../../../assets/vins/13.jpg'
    },
    {
      name: 'vin13',
      price: '25',
      picture: './../../../../assets/vins/14.jpg'
    },
    {
      name: 'vin14',
      price: '25',
      picture: './../../../../assets/vins/15.jpg'
    },
    {
      name: 'vin15',
      price: '25',
      picture: './../../../../assets/vins/16.jpg'
    },
    {
      name: 'vin16',
      price: '25',
      picture: './../../../../assets/vins/17.jpg'
    },
    {
      name: 'vin17',
      price: '25',
      picture: './../../../../assets/vins/18.jpg'
    },
    {
      name: 'vin18',
      price: '25',
      picture: './../../../../assets/vins/19.jpg'
    },
    {
      name: 'vin19',
      price: '25',
      picture: './../../../../assets/vins/20.jpg'
    },
    {
      name: 'vin20',
      price: '25',
      picture: './../../../../assets/vins/21.jpg'
    },
    {
      name: 'vin21',
      price: '25',
      picture: './../../../../assets/vins/22.jpg'
    },
    {
      name: 'vin22',
      price: '25',
      picture: './../../../../assets/vins/23.jpg'
    },
    {
      name: 'vin23',
      price: '25',
      picture: './../../../../assets/vins/24.jpg'
    },
    {
      name: 'vin24',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin25',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin26',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin27',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin28',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin29',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin30',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin31',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin32',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin33',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin34',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin35',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin36',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin37',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin38',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin39',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin40',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin41',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin42',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin43',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin44',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin45',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin46',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin47',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin48',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin49',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin50',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin51',
      price: '25',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin52',
      price: '100',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin53',
      price: '784',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin54',
      price: '1225',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin55',
      price: '125',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin56',
      price: '215',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin57',
      price: '245',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin58',
      price: '700',
      picture: './../../../../assets/vins/1.jpg'
    },
    {
      name: 'vin59',
      price: '250',
      picture: './../../../../assets/vins/1.jpg'
    }
  ];

  length = 0;
  pageSize = 10;

  lengthRentals = 0;
  pageSizeRentals = 10;

  dataSourcesRentals: MatTableDataSource<any> = new MatTableDataSource();
  dataSources: MatTableDataSource<any> = new MatTableDataSource();
  rentals: any[] = [];
  total = 0;
  pageEvent: void;

  constructor(
    private auth: AuthenticationService,
    private compteService: CompteService,
    private communeService: CommuneService,
    private utilsService: UtilsService
  ) {
    this.dataSources.data = this.vin.slice(0, 10);
    this.length = this.vin.length;
    this.utilsService.snackBarInfo(`1000 roig-coin d'achat équivaut à +1 réputation.`);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }

    this.dataSources.data = this.vin.slice(startIndex, endIndex);
  }

  onPageChangeRentals(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }

    this.dataSourcesRentals.data = this.rentals.slice(startIndex, endIndex);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  ajouterAuPanier(vin: any) {
    this.rentals.push(vin);
    // tslint:disable-next-line:radix
    this.total += parseInt(vin.price);
    this.dataSourcesRentals.data = this.rentals.slice(0, 10);
    this.lengthRentals = this.rentals.length;
  }

  retirerDuPanier(vin: any) {
    this.total -= vin.price;
    this.rentals.splice(this.rentals.indexOf(vin), 1);

    this.dataSourcesRentals.data = this.rentals.slice(0, 10);
    this.lengthRentals = this.rentals.length;
  }

  viderMonPanier() {
    this.rentals = [];
    this.total = 0;
    this.dataSourcesRentals.data = this.rentals;
  }

  acheter() {
    const id = this.currentUser.id;
    const compteId = this.currentUser.compte.id;
    let rep = 0;

    if (this.currentUser.compte.solde < this.total) {
      this.utilsService.snackBarSuccess(`Solde insuffisant ! Cet achat est impossible.`);
    } else if (this.total > 5000) {
      this.utilsService.snackBarSuccess(`vous ne pouvez effectuer des achats de plus de 5000 roig-coin`);
    } else {
      if (this.total > 1000) {
        rep += 1;
        if (this.total > 2000) {
          rep += 1;
          if (this.total > 3000) {
            rep += 1;
            if (this.total > 4000) {
              rep += 1;
              if (this.total === 5000) {
                rep += 1;
              }
            }
          }
        }
      }
      const data = {
        price: this.total,
        rep,
        id
      };
      this.compteService.acheter(data, compteId).subscribe(compte => {
        this.communeService.findById(id).subscribe(user => {
          this.auth.storeToken(user);
          this.viderMonPanier();
        });
        this.utilsService.snackBarSuccess(`Un achat éffectué. Merci et bonne journée.`);
      });
    }

  }
}
