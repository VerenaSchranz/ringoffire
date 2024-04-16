import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'


  
})
export class FirebaseServiceService {
 game: Game[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() {}
  addDoc() {
    
    console.log('FirebaseService addDoc');
    addDoc(collection(this.firestore, 'games'), { Hallo: 'Welt' });
  }
}
