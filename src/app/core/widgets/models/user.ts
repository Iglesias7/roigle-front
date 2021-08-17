import { Card } from './card';

export class User {
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    reputation: number;
    birthDate: string;
    solde: number;
    isOpen: boolean;
    qualityOfLife: string;
    token: string;
    followers: any[];
    nbCars: number;
    nbImmobiliers: number;
    isAdmin:boolean;
    compte: any;
    hand: Card[];
    nbCards: number;
    adversaire: any;
    aMoi: boolean = false;
    peche: number;
    maxMise: number;

    userIsFriends: boolean;
    userIsReceive: boolean;
    userIsFollow: boolean = false;

    constructor(data: any) {
      if (data) {
        this.id = data.id;
        this.password = data.password;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.reputation = data.reputation;
        this.birthDate = data.birthDate &&
          data.birthDate.length > 10 ? data.birthDate.substring(0, 10) : data.birthDate;
        this.solde = data.solde;
        this.isOpen = data.isOpen;
        this.qualityOfLife = data.qualityOfLife;
        this.token = data.token;
        this.followers = data.followers;
        this.nbCars = data.nbCars;
        this.nbImmobiliers = data.nbImmobiliers;
        this.isAdmin = data.isAdmin;
        this.compte = data.compte;
        this.userIsFollow = data.userIsFollow;
        this.userIsFriends = data.userIsFriends;
        this.userIsReceive = data.userIsReceive;
        this.hand = data.hand;
        this.nbCards = data.nbCards;
        this.adversaire = data.adversaire;
        this.aMoi = data.aMoi;
        this.peche = data.peche;
        this.maxMise = data.maxMise;
      }
    }
  }


