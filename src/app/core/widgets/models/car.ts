export class Car {
  id: number;
  name: string;
  mark: string;
  price: number;
  picture: string;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.mark = data.mark;
      this.price = data.price;
      this.picture = data.picture;
    }
  }
}


