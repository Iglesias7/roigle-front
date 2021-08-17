export class Compte {
  id: number;
  solde: string;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.solde = data.solde;
    }
  }
}


