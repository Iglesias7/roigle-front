import { Injectable } from '@angular/core';
import { Card } from '../widgets/models/card';

@Injectable({ providedIn: 'root' })

export class CardService {

  private banques: Card[] = [
    {
      id: 1,
      image: 'assets/js/svg/c1.svg',
      number: '1',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 2,
      image: 'assets/js/svg/c2.svg',
      number: '2',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 3,
      image: 'assets/js/svg/c3.svg',
      number: '3',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 4,
      image: 'assets/js/svg/c4.svg',
      number: '4',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 5,
      image: 'assets/js/svg/c5.svg',
      number: '5',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 6,
      image: 'assets/js/svg/c6.svg',
      number: '6',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 7,
      image: 'assets/js/svg/c7.svg',
      number: '7',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 8,
      image: 'assets/js/svg/c8.svg',
      number: '8',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 9,
      image: 'assets/js/svg/c9.svg',
      number: '9',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 10,
      image: 'assets/js/svg/c10.svg',
      number: '10',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 11,
      image: 'assets/js/svg/c11.svg',
      number: '11',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 12,
      image: 'assets/js/svg/c12.svg',
      number: '12',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 13,
      image: 'assets/js/svg/c13.svg',
      number: '13',
      type: 'arachide',
      faceUp: true
    },
    {
      id: 14,
      image: 'assets/js/svg/d1.svg',
      number: '1',
      type: 'square',
      faceUp: true
    },

    {
      id: 15,
      image: 'assets/js/svg/d2.svg',
      number: '2',
      type: 'square',
      faceUp: true
    },
    {
      id: 16,
      image: 'assets/js/svg/d3.svg',
      number: '3',
      type: 'square',
      faceUp: true
    },
    {
      id: 17,
      image: 'assets/js/svg/d4.svg',
      number: '4',
      type: 'square',
      faceUp: true
    },
    {
      id: 18,
      image: 'assets/js/svg/d5.svg',
      number: '5',
      type: 'square',
      faceUp: true
    },
    {
      id: 19,
      image: 'assets/js/svg/d6.svg',
      number: '6',
      type: 'square',
      faceUp: true
    },
    {
      id: 20,
      image: 'assets/js/svg/d7.svg',
      number: '7',
      type: 'square',
      faceUp: true
    },
    {
      id: 21,
      image: 'assets/js/svg/d8.svg',
      number: '8',
      type: 'square',
      faceUp: true
    },
    {
      id: 22,
      image: 'assets/js/svg/d9.svg',
      number: '9',
      type: 'square',
      faceUp: true
    },
    {
      id: 23,
      image: 'assets/js/svg/d10.svg',
      number: '10',
      type: 'square',
      faceUp: true
    },
    {
      id: 24,
      image: 'assets/js/svg/d11.svg',
      number: '11',
      type: 'square',
      faceUp: true
    },
    {
      id: 25,
      image: 'assets/js/svg/d12.svg',
      number: '12',
      type: 'square',
      faceUp: true
    },
    {
      id: 26,
      image: 'assets/js/svg/d13.svg',
      number: '13',
      type: 'square',
      faceUp: true
    },
    {
      id: 27,
      image: 'assets/js/svg/h1.svg',
      number: '1',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 28,
      image: 'assets/js/svg/h2.svg',
      number: '2',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 29,
      image: 'assets/js/svg/h3.svg',
      number: '3',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 30,
      image: 'assets/js/svg/h4.svg',
      number: '4',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 31,
      image: 'assets/js/svg/h5.svg',
      number: '5',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 32,
      image: 'assets/js/svg/h6.svg',
      number: '6',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 33,
      image: 'assets/js/svg/h7.svg',
      number: '7',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 34,
      image: 'assets/js/svg/h8.svg',
      number: '8',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 35,
      image: 'assets/js/svg/h9.svg',
      number: '9',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 36,
      image: 'assets/js/svg/h10.svg',
      number: '10',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 37,
      image: 'assets/js/svg/h11.svg',
      number: '11',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 38,
      image: 'assets/js/svg/h12.svg',
      number: '12',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 39,
      image: 'assets/js/svg/h13.svg',
      number: '13',
      type: 'coeur',
      faceUp: true
    },
    {
      id: 40,
      image: 'assets/js/svg/s1.svg',
      number: '1',
      type: 'black',
      faceUp: true
    },
    {
      id: 41,
      image: 'assets/js/svg/s2.svg',
      number: '2',
      type: 'black',
      faceUp: true
    },
    {
      id: 42,
      image: 'assets/js/svg/s3.svg',
      number: '3',
      type: 'black',
      faceUp: true
    },
    {
      id: 43,
      image: 'assets/js/svg/s4.svg',
      number: '4',
      type: 'black',
      faceUp: true
    },
    {
      id: 44,
      image: 'assets/js/svg/s5.svg',
      number: '5',
      type: 'black',
      faceUp: true
    },
    {
      id: 45,
      image: 'assets/js/svg/s6.svg',
      number: '6',
      type: 'black',
      faceUp: true
    },
    {
      id: 46,
      image: 'assets/js/svg/s7.svg',
      number: '7',
      type: 'black',
      faceUp: true
    },
    {
      id: 47,
      image: 'assets/js/svg/s8.svg',
      number: '8',
      type: 'black',
      faceUp: true
    },
    {
      id: 48,
      image: 'assets/js/svg/s9.svg',
      number: '9',
      type: 'black',
      faceUp: true
    },
    {
      id: 49,
      image: 'assets/js/svg/s10.svg',
      number: '10',
      type: 'black',
      faceUp: true
    },
    {
      id: 50,
      image: 'assets/js/svg/s11.svg',
      number: '11',
      type: 'black',
      faceUp: true
    },
    {
      id: 51,
      image: 'assets/js/svg/s12.svg',
      number: '12',
      type: 'black',
      faceUp: true
    },
    {
      id: 52,
      image: 'assets/js/svg/s13.svg',
      number: '13',
      type: 'black',
      faceUp: true
    },
    {
      id: 53,
      image: 'assets/js/svg/joker_black.svg',
      number: '14',
      type: 'black',
      faceUp: true
    },
    {
      id: 54,
      image: 'assets/js/svg/joker_red.svg',
      number: '15',
      type: 'red',
      faceUp: true
    }
  ];

  public getBanque(){
    return this.banques;
  }
}
