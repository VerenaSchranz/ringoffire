import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnInit {
  game: Game[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() {}

  ngOnInit(): void {

  }
  getGameRef() {
    return collection(this.firestore, 'games');
  }
  getSingleDocRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
