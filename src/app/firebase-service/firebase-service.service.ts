import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'


  
})
export class FirebaseServiceService {
 game: Game[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() {}
/*   addDoc() {
    
    console.log('FirebaseService addDoc');
    addDoc(collection(this.firestore, 'games'), { Hallo: 'Welt' });
  } */

  getGameRef() {
    return collection(this.firestore, 'games');
  }
  
  getSingleDocRef(colId:string, docId:string) {
  return doc(collection(this.firestore, colId), docId)
  }
}
