import { User } from './user';

export class Pret {
  id: number;
  montant: number;
  message: string;
  delai: string;
  donneur: User;
  demandeur: User;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.montant = data.montant;
      this.message = data.message;
      this.delai = data.delai;
      this.donneur = data.donneur;
      this.demandeur = data.demandeur;
    }
  }
}
