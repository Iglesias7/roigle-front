export class Immobilier {
  id: number;
  name: string;
  type: string;
  price: number;
  picture: string;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.price = data.price;
      this.picture = data.picture;
    }
  }
}


