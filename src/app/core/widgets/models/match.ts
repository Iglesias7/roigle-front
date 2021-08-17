import { Card } from "./card";
import { User } from "./user";

export class Match {
  id: number;
  joueur1: User;
  joueur2: User;
  milieux: Card;
  bank: Card;
  mise: number;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.joueur1 = data.joueur1;
      this.joueur2 = data.joueur2;
      this.milieux = data.milieux;
      this.bank = data.bank;
      this.mise = data.mise;
    }
  }
}
