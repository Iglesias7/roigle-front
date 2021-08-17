export class Card {
  id: number;
  image: string;
  number: string;
  type: string;
  faceUp: boolean;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.image = data.image;
      this.number = data.number;
      this.type = data.type;
      this.faceUp = data.faceUp;
    }
  }
}
